var data = [];
var polygons = {};
$.each(overlays, function(key, value){
    data.push(key);
})
data = data.sort();
colors = [
    '#7e1e9c', '#15b01a', '#75bbfd', '#f97306', '#c79fef', '#ff796c','#d5b60a', '#069af3', '#ff000d', '#C0C0C0'
]

function createHoverOverlay(name, region){
   //save name for hoverfunction closure
   var name = name;

    var avgLat = avgLng = 0;
    $.each(region, function(){
        avgLat += this.lat();
        avgLng += this.lng();
    });
    avgLat /= region.length;
    avgLng /= region.length;
    console.log('<div class="label" style="display:none" data-value="'+name+'">'+name+'<div class="overlay_arrow above"></div></div>')
    map.drawOverlay({
        lat: avgLat,
        lng: avgLng,
        content: '<div class="label" style="display:none" data-value="'+name+'">'+name+'<div class="overlay_arrow above"></div></div>',
    });
   var mouseOver = function(){
        var width = $('div[data-value="'+name+'"]').width();
    var height = $('div[data-value="'+name+'"]').height();
    $('div[data-value="'+name+'"]').css({'bottom':(height+16)+'px', 'right': (width/2)+'px', 'display':'block'});
        $('div[data-value="'+name+'"]').css("display", 'block');
   }
   var mouseOut = function(){
        $('div[data-value="'+name+'"]').css("display", 'none');
   }
   google.maps.event.addListener(polygons[name], 'mouseover', mouseOver);
   google.maps.event.addListener(polygons[name], 'mouseout', mouseOut);    
}

function createOverlay(name, region){
    var color = colors[Math.floor(Math.random()*10)];
   polygons[name] = new google.maps.Polygon({
        paths: region,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35
    });
   createHoverOverlay(name, region);
}

$(document).ready(function(){
    mapVM = new MapViewModel();
    ko.applyBindings(map, $('#locations')[0]);
 });

var MapViewModel = function(){
    var options = {
        center: new google.maps.LatLng(40.75, -74),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new GMaps({
        div: '#map-canvas',
        lat: 40.75,
        lng: -74,
        zoom: 12
    })
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
        ]
      }
    });
    drawingManager.setMap(map.map);
    //initialize regions
    $.each(overlays, function(name, region){
        createOverlay(name, region);
        polygons[name].setMap(map.map);
    });

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(e) {
        var avgLat = avgLng = 0;
        polygon = e;
        var region = e.getPath().b;
        $.each(region, function(){
            console.log('new google.maps.LatLng('+this.lat()+", "+this.lng()+"),");
            avgLat += this.lat();
            avgLng += this.lng();
        });
        avgLat /= region.length;
        avgLng /= region.length;
        var content = "<div style='padding-top:10px'> Region name:&nbsp;"+
            "<input id='region-name' type='text'><br/>"+
            "<input type='button' value='enter' onclick='save()'></div>";
        info = new google.maps.InfoWindow({
            position: new google.maps.LatLng(avgLat, avgLng),
            content: content
        });
        info.open(map);
    });
    var self = this;
    
    // locations contains the name of the region, along with
    // the array of LatLng coordinates that defines it
    locations = ko.observableArray(data);
}

function save(){
    var name = $('#region-name').val();
    locations.push(name);
    polygons[name] = polygon;
    // createOverlay(location.name, location.region);
    createHoverOverlay(name, polygon.getPath().b)
    info.close();
    info.setMap(null);
    info = null;
}

function draw(){
    var name = this;
    if($(':checkbox[data-value="'+name+'"]').is(":checked"))
        polygons[name].setMap(map.map);
    else
        polygons[name].setMap(null);
    return true;
}