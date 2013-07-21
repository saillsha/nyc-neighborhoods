maps = {};

//initializes all the maps stuff
maps.init = function(){
    gmap = new GMaps({
        div: '#map-canvas',
        lat: 40.75,
        lng: -74,
        zoom: 12
    });
    maps.drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
        ]
      }
    });

    var selectBox = "";
    $.each(colors, function(color, hexValue){
        selectBox += '<option>'+color+'</option>';
    });
    var tag = '<select id="region-color">';
    var i = maps.popup_content.indexOf(tag);
    var firstPart = maps.popup_content.substring(0, i+tag.length);
    var secondPart = maps.popup_content.substring(i+tag.length, maps.popup_content.length);
    maps.popup_content = firstPart.concat(selectBox, secondPart);

    maps.drawingManager.setMap(gmap.map);
    //handler called after the polygon is complete
    //i.e. when the user drawn path becomes closed
    google.maps.event.addListener(maps.drawingManager, 'polygoncomplete', 
        maps.polyComplete);
    // //initialize regions
    $.each(mapVM.regions(), function(index, region){
        maps.createOverlay(region);
    });
}

maps.createOverlay = function(region){
    var options = {
            strokeColor: region.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: region.color,
            fillOpacity: 0.35
    };
    if(region.poly){
        region.poly.setOptions(options);
    }
    else{
        options['path'] = region.path;
        region['poly'] = new google.maps.Polygon(options)
    }
    region.poly.setMap(gmap.map);
    google.maps.event.addListener(region.poly, 'click', maps.clickPoly(region));
   //prohibit double clicking to zoom within a region...that just messes things up
    google.maps.event.addListener(region.poly, 'dblclick', function(e){ e.stop(); });
    maps.createHoverOverlay(region);
}


maps.createHoverOverlay = function(region){
    var avgLat = avgLng = 0;
    $.each(region.path, function(){
        avgLat += this.lat();
        avgLng += this.lng();
    });
    avgLat /= region.path.length;
    avgLng /= region.path.length;
    gmap.drawOverlay({
        lat: avgLat,
        lng: avgLng,
        content: '<div class="label" style="display:none; background-color:'+ 
            region.color + '" data-value="'+region.name+'">'+region.name+
            '<div class="overlay_arrow above" style="border-top: 10px solid '+
            region.color + '"></div></div>'
    });
   var mouseOver = function(){
        var width = $('div[data-value="'+region.name+'"]').width();
        var height = $('div[data-value="'+region.name+'"]').height();
        $('div[data-value="'+region.name+'"]').css({
            'bottom':(height+16)+'px', 
            'right': (width/2)+'px', 
            'display':'block'
        });
        region.poly.setOptions({fillOpacity:.8});
   }
   var mouseOut = function(){
        $('div[data-value="'+region.name+'"]').css("display", 'none');
        region.poly.setOptions({fillOpacity:.35});
   }
   google.maps.event.addListener(region.poly, 'mouseover', mouseOver);
   google.maps.event.addListener(region.poly, 'mouseout', mouseOut);
}

maps.createLabel = function(region, i){
    var p1 = region.path[i];
    var p2 = region.path[(i+1)%region.path.length];
    var avgLat = (p1.lat()+p2.lat())/2;
    var avgLng = (p1.lng()+p2.lng())/2;
    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
            avgLat + ',' + avgLng + '&sensor=false',
        type: 'get',
        dataTye: 'jsonp',
        success: function(response){
            //create street label if reverse geocoding
            //was successful in getting street name
            if(response.results[0] && response.results[0].address_components[1]){
                region.street_labels[i] = new StreetLabel({
                    text: response.results[0].address_components[1].short_name,
                    point1: p1,
                    point2: p2,
                });
            }
        },
    });
}

//called when user finishes drawing polygon
maps.polyComplete = function(e){
    var avgLat = avgLng = 0;
    var path = e.getPath().b;

    //initializing new region object with some default values
    maps.newRegion = {
        poly: e,
        lines: [],
        has_label: [],
        street_labels: [],
        color: colors['green'],
        path: path
    };

    //change cursor back to non-drawing mode
    maps.drawingManager.setOptions({drawingMode: null});
    //replace user drawn n-sided polygon with an equivalent set of
    //n lines representing each side. This way, we can attach a 
    //separate click handler to each line.
    for(var i=0; i<path.length; i++){
        var line = new google.maps.Polyline({
            path: [path[i], path[(i+1)%path.length]],
            strokeColor: '#000000',
            strokeWeight: 4,
            strokeOpacity: .7
        });
        line.setMap(gmap.map);
        maps.newRegion['lines'].push(line);
        maps.newRegion.has_label[i] = false;
        //clickLine actually returns the hander function
        //it's just a wrapper needed to save the line state
        google.maps.event.addListener(line, 'click', maps.clickLine(i, line));

        //determine the centroid of the region for
        //anchoring the pop up window
        avgLat += path[i].lat();
        avgLng += path[i].lng();
    }
    avgLat /= path.length;
    avgLng /= path.length;

    maps.popup = new google.maps.InfoWindow({
        position: new google.maps.LatLng(avgLat, avgLng),
        content: maps.popup_content
    });
    maps.popup.open(gmap.map);
    //remove user drawn polygon
    e.setMap(null); 
}

//click handler on save button in pop up window
//saves newly created polygon
maps.savePoly = function(){
    $.each(maps.newRegion.lines, function(){
        this.setMap(null);
    })
    delete maps.newRegion.lines
    maps.newRegion['name'] = $('#region-name').val();
    maps.newRegion['color'] = colors[$('#region-color option:selected').val()];

    /*console log statements for creating region object*/
    logStr = "";
    logStr += "{\n\tname: '"+maps.newRegion['name']+"',\n";
    logStr += "\tcolor: '"+maps.newRegion['color']+"',\n";
    logStr += "\tpath: [\n";
    for(var i=0; i<maps.newRegion['path'].length; i++){
        logStr += "\t\tnew google.maps.LatLng("+
            maps.newRegion.path[i].lat()+", "+
            maps.newRegion.path[i].lng()+"),\n";
    }
    logStr += "\t],\n\tstreet_labels: [],\n";
    logStr += "has_label: [" + maps.newRegion.has_label[0];
    for(var i=1; i<maps.newRegion.has_label.length; i++){
        logStr += ", "+maps.newRegion.has_label[i];
    }
    logStr += "]\n},";
    console.log(logStr);


    mapVM.regions.push(maps.newRegion);
    maps.popup.close();
    maps.popup.setMap(null);
    maps.createOverlay(maps.newRegion);
}

//click handler on checkboxes for showing/hiding regions
maps.draw = function(region){
    var checkbox = $(':checkbox[data-value="'+region.name+'"]');
    if($(checkbox).is(":checked")){
        region.poly.setMap(gmap.map);
        $(checkbox).next().addClass('image-checked');
    }
    else{
        region.poly.setMap(null);
        $(checkbox).next().removeClass('image-checked');
        //remove all street labels associated with the region as well
        $.each(region.street_labels, function(){ this.set('display', 'none');});
    }
    //returning true is a KO specific thing that
    //causes other click handlers to fire
    return true;
}

//called when you click on a polygon
maps.clickPoly = function(region){
return function(){
    //if any previous regions were clicked, remove their street labels
    if(maps.prev_clicked){
        maps.prev_clicked.poly.setOptions({strokeWeight: 2});
        $.each(maps.prev_clicked.street_labels, 
            function(){ this.set('display', 'none'); });
    }
    maps.prev_clicked = region;
    var path = region.path;
    //create street label for all selected boundaries
    for(var i=0; i < path.length; i++){
        if(region.has_label[i]){
            //first time region is clicked, it needs to pull the
            //street data from google reverse geocoding API
            if(region.street_labels[i] != undefined)
                region.street_labels[i].set('display', 'block');
            else 
                maps.createLabel(region, i);
        }
    }
    //make all the lines of the selected polygon bolder
    region.poly.setOptions({strokeWeight: 4});
}
}

//called when you click on a line during drawing mode
maps.clickLine = function(index, line){
    return function(){
        if(line['strokeColor'] == '#000000'){
            line.setOptions({strokeColor: '#ff000d'});
            maps.newRegion.has_label[index] = true;
        }
        else if(line['strokeColor'] == '#ff000d'){
            line.setOptions({strokeColor: '#000000'});
            maps.newRegion.has_label[index] = false;
        }
    };
};

maps.popup_content = 
'<div id="info-window">' +
  '1. Region name:&nbsp;'+
  '<input id="region-name" type="text"><br/>'+
  '2. Region color:&nbsp;'+
  '<select id="region-color">'+
  '</select><br/>'+
  '3. Click on the boundaries you wish to <br>'+
     'label with street names. These lines must <br> coincide with actual streets for expected results.<br>'+
  '<input type="button" value="enter" onclick="maps.savePoly()">'+
'</div>';
