maps = {};

//initializes all the maps stuff
maps.init = function(){
    gmap = new GMaps({
        div: '#map-canvas',
        lat: 40.75,
        lng: -74,
        zoom: 13
    });
    maps.escapeDrawing = false;
    maps.drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
        ]
      },
      polygonOptions: {
        editable: true,
        fillColor: colors['purple'],
        strokeColor: colors['purple']
      }
    });
    $(window).keyup(function(e){
        if(e.keyCode == 27){
            maps.escapeDrawing = true;
            maps.drawingManager.setOptions({drawingMode: null});
        }
    })
    var selectBox = "";
    $.each(colors, function(color, hexValue){
        selectBox += '<option>'+color+'</option>';
    });
    $('#region-color').html(selectBox);
    $('#region-color').click(function(){
        var color = $(this).find(':selected').text();
        maps.newRegion.poly.setOptions({
            fillColor: colors[color],
            strokeColor: colors[color]
        });
    });

    maps.drawingManager.setMap(gmap.map);
    // google.maps.event.addListener(maps.drawingManager, 'linecomplete', function(e){
    //     console.log(e);
    // });
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
            fillOpacity: 0.35,
            editable: false
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
    google.maps.event.addListener(region.poly, 'dblclick', 
        function(e){ /*maps.removePoly(region);*/ e.stop(); });
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
        region.poly.setOptions({fillOpacity:.6});
   }
   var mouseOut = function(){
        $('div[data-value="'+region.name+'"]').css("display", 'none');
        region.poly.setOptions({fillOpacity:.35});
   }
   google.maps.event.addListener(region.poly, 'mouseover', mouseOver);
   google.maps.event.addListener(region.poly, 'mouseout', mouseOut);
}

//reverse geocoding a line works as follows:
//we reverse geocode the first and second trisection of line
//if they return the same street name, we go with that as the label
//otherwise, we reverse geocode the midpoint and use it as a tiebreaker
maps.createLabel = function(region, i){
    var p1 = region.path[i];
    var p2 = region.path[(i+1)%region.path.length];
    var street_names = [];
    var successFunc = function(index){
        return function(response){
            if(response.results[0] && response.results[0].address_components[1]){
                street_names[index] = response.results[0].address_components[1].short_name;
            }
            else{
                street_names[index] = null;
            }
            if(street_names[(index+1)%2] != undefined){
                //okay other ajax call already returned
                if(street_names[index] == street_names[(index+1)%2]){
                    //hooray they both match, let's create the street label
                     region.street_labels[i] = new StreetLabel({
                        text: street_names[index],
                        point1: p1,
                        point2: p2,
                    });
                }
                else{
                    //they don't match, so let's use midpoint as tiebreaker
                    var avgLat = (p1.lat()+p2.lat())/2;
                    var avgLng = (p1.lng()+p2.lng())/2;
                    $.ajax({
                        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
                            avgLat + ',' + avgLng + '&sensor=false',
                        type: 'get',
                        datatype:'jsonp',
                        success: function(response){
                            if(response.results[0] && response.results[0].address_components[1]){
                                var tiebreaker = response.results[0].address_components[1].short_name;
                                if(tiebreaker == street_names[0] || tiebreaker == street_names[1]){
                                    //tiebreaker was successful
                                    region.street_labels[i] = new StreetLabel({
                                        text: tiebreaker,
                                        point1: p1,
                                        point2: p2,
                                    });
                                }
                            }
                        }
                    });
                }
            }
        };
    };
    //ajax call for first trisection
    var trisectionLat = (p1.lat()+2*p2.lat())/3;
    var trisectionLng = (p1.lng()+2*p2.lng())/3;
    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
            trisectionLat + ',' + trisectionLng + '&sensor=false',
        type: 'get',
        dataTye: 'jsonp',
        success: successFunc(0)
    });
    var trisectionLat = (2*p1.lat()+p2.lat())/3;
    var trisectionLng = (2*p1.lng()+p2.lng())/3;
    //ajax call for second trisection
    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
            trisectionLat + ',' + trisectionLng + '&sensor=false',
        type: 'get',
        dataTye: 'jsonp',
        success: successFunc(1)
    });
}

//called when user finishes drawing polygon
maps.polyComplete = function(e){
    if(maps.escapeDrawing){
        //escape button was pressed so remove polygon
        e.setMap(null);
        maps.escapeDrawing = false;
        maps.drawingManager.setOptions({drawingMode: google.maps.drawing.OverlayType.POLYGON});
    }
    else{
        //initializing new region object with some default values
        maps.newRegion = {
            poly: e,
            lines: [],
            has_label: [],
            street_labels: [],
            color: colors['green'],
            path: e.getPath().b
        };
        //change cursor back to non-drawing mode
        maps.drawingManager.setOptions({drawingMode: null});
        $('#info-window').css('visibility', 'visible');
    }
}

maps.editPoly = function(){
    var path = maps.newRegion.path;
    var maxLng = -180;
    var minLat = 180;
    //replace user drawn n-sided polygon with an equivalent set of
    //n lines representing each side. This way, we can attach a 
    //separate click handler to each line.
    for(var i=0; i<path.length; i++){
        var line = new google.maps.Polyline({
            path: [path[i], path[(i+1)%path.length]],
            strokeColor: '#000000',
            strokeWeight: 5,
            strokeOpacity: 1,
            layer: 'floatPane'
        });
        line.setMap(gmap.map);
        maps.newRegion['lines'].push(line);
        maps.newRegion.has_label[i] = false;
        //clickLine actually returns the hander function
        //it's just a wrapper needed to save the line state
        google.maps.event.addListener(line, 'click', maps.clickLine(i, line));

        minLat = Math.min(minLat, path[i].lat());
        maxLng = Math.max(maxLng, path[i].lng());
    }
    // maps.newRegion.poly.setMap(null); 
    maps.newRegion.poly.setOptions({editable: false, strokeWeight: 0});
    $('#info-window p').css('color', 'black');
    $('#info-window :button[value="done"]').attr('disabled', 'disabled');
    $('#info-window :button[value="save"]').removeAttr('disabled');
}

maps.cancelPoly = function(){
    $.each(maps.newRegion.lines, function(){
        this.setMap(null);
    });
    maps.newRegion.poly.setMap(null);
    $('#info-window p').css('color', 'gray');
    $('#info-window :button[value="save"]').attr('disabled', 'disabled');
    $('#info-window :button[value="done"]').removeAttr('disabled');
    $('#info-window').css('visibility', 'hidden');    
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
    $('#info-window p').css('color', 'gray');
    $('#info-window :button[value="save"]').attr('disabled', 'disabled');
    $('#info-window :button[value="done"]').removeAttr('disabled');
    $('#info-window').css('visibility', 'hidden');
    maps.createOverlay(maps.newRegion);
}

//removes polygon from the map
maps.removePoly = function(region){
    var checkbox = $(':checkbox[data-value="'+region.name+'"]');
    region.poly.setOptions({strokeWeight: 2});
    region.poly.setMap(null);
    $(checkbox).next().removeClass('image-checked');
    //remove all street labels associated with the region as well
    $.each(region.street_labels, function(index, street_label){ 
        if(street_label) 
            street_label.set('display', 'none');
    });
}

//click handler on checkboxes for showing/hiding regions
maps.draw = function(region){
    var checkbox = $(':checkbox[data-value="'+region.name+'"]');
    if($(checkbox).is(":checked")){
        region.poly.setMap(gmap.map);
        $(checkbox).next().addClass('image-checked');
    }
    else{
        maps.removePoly(region);
    }
    //returning true is a KO specific thing that
    //causes other click handlers to fire
    return true;
}

//called when you click on a polygon
maps.clickPoly = function(region){
return function(){
    //if any previous regions were clicked, remove their street labels
    // if(maps.prev_clicked){
    //     maps.prev_clicked.poly.setOptions({strokeWeight: 2});
    //     $.each(maps.prev_clicked.street_labels, function(index, street_label){ 
    //             if(street_label)
    //                 street_label.set('display', 'none');
    //     });
    // }
    // maps.prev_clicked = region;
    var path = region.path;
    //create street label for all selected boundaries
    for(var i=0; i < path.length; i++){
        if(region.has_label[i]){
            //first time region is clicked, it needs to pull the
            //street data from google reverse geocoding API
            if(region.street_labels[i] == undefined)
                maps.createLabel(region, i);
            else if(region.poly.strokeWeight == 2)
                region.street_labels[i].set('display', 'block');
            else
                region.street_labels[i].set('display', 'none');
        }
    }
    //make all the lines of the selected polygon bolder
    if(region.poly.strokeWeight == 2)
        region.poly.setOptions({strokeWeight: 4});
    else
        region.poly.setOptions({strokeWeight: 2});
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