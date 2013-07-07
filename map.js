var data = [
    'Central Park',
    'Chelsea',
    'Bowery',
    'West Village',
    'East Village'
];

colors = [
    '#7e1e9c', '#15b01a', '#75bbfd', '#f97306', '#c79fef', '#ff796c','#d5b60a', '#069af3', '#ff000d', '#C0C0C0'
]

var overlays = {
    'Central Park':[
        new google.maps.LatLng(40.7970474627213, -73.94907653331757),
        new google.maps.LatLng(40.76455136505513, -73.9727658033371),
        new google.maps.LatLng(40.76806170936613, -73.98237884044647),
        new google.maps.LatLng(40.800556090021466, -73.9580887556076)
    ],
    'Chelsea':[
        new google.maps.LatLng(40.757205044580815, -74.00495231151581),
        new google.maps.LatLng(40.749792889699464, -73.98770034313202),
        new google.maps.LatLng(40.73717732305697, -73.99679839611053),
        new google.maps.LatLng(40.74257499754292, -74.00890052318573),
        new google.maps.LatLng(40.74816730666263, -74.00769889354706),
        new google.maps.LatLng(40.749987956993444, -74.00855720043182),
        new google.maps.LatLng(40.75401921961654, -74.00744140148163)
    ],
    'Bowery':[
        new google.maps.LatLng(40.72699858870393, -73.99155467748642),
        new google.maps.LatLng(40.720201058841496, -73.99404376745224),
        new google.maps.LatLng(40.716102691059206, -73.9960178732872),
        new google.maps.LatLng(40.71502926732618, -73.99249881505966),
        new google.maps.LatLng(40.72296568823725, -73.98863643407822),
        new google.maps.LatLng(40.72520983236449, -73.98709148168564)
    ],
    'West Village':[
        new google.maps.LatLng(40.74104678475861, -74.00537341833115), 
        new google.maps.LatLng(40.73733991001137, -73.99683326482773), 
        new google.maps.LatLng(40.730901162924205, -74.00155395269394),
        new google.maps.LatLng(40.728266950429735, -74.0029701590538), 
        new google.maps.LatLng(40.72911251148341, -74.01078075170517), 
        new google.maps.LatLng(40.73945350425846, -74.00979369878769), 
        new google.maps.LatLng(40.739420987932526, -74.00653213262558)
    ],
    'East Village':[
        new google.maps.LatLng(40.724169079279605, -73.99267047643661),
        new google.maps.LatLng(40.718672332110465, -73.97486060857773),
        new google.maps.LatLng(40.726835976477936, -73.97189944982529),
        new google.maps.LatLng(40.7332425975975, -73.98722022771835),
        new google.maps.LatLng(40.727258767439, -73.99151176214218)
    ]
};
//initialize regions
$.each(overlays, createOverlay);

function createOverlay(name, region){
    var color = colors[Math.floor(Math.random()*10)];
   overlays[name] = new google.maps.Polygon({
        paths: region,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35
    }); 
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
    map = new google.maps.Map($('#map-canvas')[0], options);
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
        ]
      }
    });
    drawingManager.setMap(map);
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
    overlays[name] = polygon;
    // createOverlay(location.name, location.region);
    info.close();
    info.setMap(null);
    info = null;
}

function draw(){
    var name = this;
    if($(':checkbox[data-value="'+name+'"]').is(":checked"))
        overlays[name].setMap(map);
    else
        overlays[name].setMap(null);
    return true;
}