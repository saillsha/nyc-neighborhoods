// var data = [];
// //polygons contains all the 
// var polygons = {};
// var street_labels = {};
// var prev_clicked = null;
// $.each(overlays, function(key, value){
//     data.push(key);
// })
// data = data.sort();
// colors = {
//     purple: '#7e1e9c', 
//     green: '#15b01a',
//     lightBlue: '#75bbfd', 
//     orange: '#f97306', 
//     pink: '#ff79e5',
//     gold: '#d9d71e', 
//     blue: '#069af3', 
//     red: '#ff000d'
// };

// function createHoverOverlay(name, region, color){
//    //save name for hoverfunction closure
//    var name = name;

//     var avgLat = avgLng = 0;
//     $.each(region, function(){
//         avgLat += this.lat();
//         avgLng += this.lng();
//     });
//     avgLat /= region.length;
//     avgLng /= region.length;
//     map.drawOverlay({
//         lat: avgLat,
//         lng: avgLng,
//         content: '<div class="label" style="display:none; background-color:'+ 
//             color + '" data-value="'+name+'">'+name+
//             '<div class="overlay_arrow above" style="border-top: 10px solid '+
//             color + '"></div></div>'
//     });
//    var mouseOver = function(){
//         var width = $('div[data-value="'+name+'"]').width();
//         var height = $('div[data-value="'+name+'"]').height();
//         $('div[data-value="'+name+'"]').css({
//             'bottom':(height+16)+'px', 
//             'right': (width/2)+'px', 
//             'display':'block'
//         });
//         polygons[name].setOptions({fillOpacity:.8});
//    }
//    var mouseOut = function(){
//         $('div[data-value="'+name+'"]').css("display", 'none');
//         polygons[name].setOptions({fillOpacity:.35})
//    }
//    google.maps.event.addListener(polygons[name], 'mouseover', mouseOver);
//    google.maps.event.addListener(polygons[name], 'mouseout', mouseOut);
// }

// function createOverlay(name, region){
   //  var color = colors[region.color];
   // polygons[name] = new google.maps.Polygon({
   //      paths: region.path,
   //      strokeColor: color,
   //      strokeOpacity: 0.8,
   //      strokeWeight: 2,
   //      fillColor: color,
   //      fillOpacity: 0.35
   //  });
   // var name = name;
   // var path = region.path;
   // street_labels[name] = [];
   // var clickFunc = function(){
   //      //if any previous regions were clicked, removed their street labels
   //      if(prev_clicked != null){
   //          polygons[prev_clicked].setOptions({strokeWeight: 2});
   //          $.each(street_labels[prev_clicked], function(){ this.set('display', 'none')});
   //      }
   //      prev_clicked = name;
   //      //create street label for all selected boundaries 
   //      for(var i=0; i < path.length; i++){
   //          var p1 = path[i];
   //          var p2 = path[(i+1)%path.length];
   //          if(street_labels[name].length == path.length)
   //              street_labels[name][i].set('display', 'block');
   //          else
   //              createLabel(name, p1, p2);
   //      }
   //      polygons[name].setOptions({strokeWeight: 4});
   // }

   //use reverse geocoding to get street name of line between two points
   // var createLabel = function(name, point1, point2){
   //      var avgLat = (point1.lat()+point2.lat())/2;
   //      var avgLng = (point1.lng()+point2.lng())/2;
   //      $.ajax({
   //          url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
   //              avgLat + ',' + avgLng + '&sensor=false',
   //          type: 'get',
   //          dataTye: 'jsonp',
   //          success: function(response){
   //              //create street label if reverse geocoding
   //              //was successful in getting street name
   //              if(response.results[0] && 
   //                  response.results[0].address_components[1])
   //                  street_labels[name].push(new Label({
   //                      text: response.results[0].address_components[1].short_name,
   //                      point1: point1,
   //                      point2: point2,
   //                  }));
   //          },
   //      });
   // }

   // google.maps.event.addListener(polygons[name], 'click', clickFunc);
   // //prohibit double clicking to zoom within a region...that just messes things up
   // google.maps.event.addListener(polygons[name], 'dblclick', function(e){ e.stop(); });
   // createHoverOverlay(name, region.path, color);
// }

$(document).ready(function(){
    mapVM = new MapViewModel();
    ko.applyBindings(mapVM, $('#locations')[0]);
    //hovering over a name on the checklist causes the corresponding region to be highlighted
    $('label.line').hover(
        function(){
            mapVM.regionsMap()[$(this).find('span').text()].poly.setOptions({fillOpacity: .8});
        },
        function(){
            mapVM.regionsMap()[$(this).find('span').text()].poly.setOptions({fillOpacity: .35});
        }
    );
    maps.init();
});

var MapViewModel = function(){
    //array of regions
    var self = this;
    self.regions = ko.observableArray(regions);
    //maps region names to regions
    self.regionsMap = ko.computed(function(){
        var regMap = {};
        $.each(self.regions(), function(index, elem){
            regMap[elem.name] = elem;
        });
        return regMap;
    });
}
    // var options = {
    //     center: new google.maps.LatLng(40.75, -74),
    //     zoom: 12,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // map = new GMaps({
    //     div: '#map-canvas',
    //     lat: 40.75,
    //     lng: -74,
    //     zoom: 12
    // });
    // var drawingManager = new google.maps.drawing.DrawingManager({
    //   drawingControl: true,
    //   drawingControlOptions: {
    //     position: google.maps.ControlPosition.TOP_CENTER,
    //     drawingModes: [
    //       google.maps.drawing.OverlayType.POLYGON,
    //     ]
    //   }
    // });
    // drawingManager.setMap(map.map);
    // //initialize regions
    // $.each(overlays, function(name, region){
    //     createOverlay(name, region);
    //     polygons[name].setMap(map.map);
    // });

    //called when you click on a line during drawing mode
    // var clickLineFunc = function(line, index){
    //     return function(){
    //         if(line['strokeColor'] == '#000000'){
    //             line.setOptions({strokeColor: '#ff000d'});

    //         }
    //         else if(line['strokeColor'] == '#ff000d'){
    //             line.setOptions({strokeColor: '#000000'});
    //         }
    //     };
    // }

    // google.maps.event.addListener(drawingManager, 'polygoncomplete', function(e) {
    //     var avgLat = avgLng = 0;
    //     polygon = e;
    //     var region = e.getPath().b;
    //     var lineArray = [];
    //     //change cursor back to non-drawing mode
    //     drawingManager.setOptions({drawingMode: null});
    //     //replace user drawn n-sided polygon with an equivalent set of
    //     //n lines representing each side. This way, we can attach a 
    //     //separate click handler to each line.
    //     for(var i=0; i<region.length; i++){
    //         var line = new google.maps.Polyline({
    //             path: [region[i], region[(i+1)%region.length]],
    //             strokeColor: '#000000',
    //             strokeWeight: 4,
    //             strokeOpacity: .7
    //         });
    //         line.setMap(map.map);
    //         lineArray.push(line);
    //         google.maps.event.addListener(line, 'click', clickLineFunc(line));
    //     }
    //     $.each(region, function(){
    //         console.log('new google.maps.LatLng('+this.lat()+", "+this.lng()+"),");
    //         avgLat += this.lat();
    //         avgLng += this.lng();
    //     });
    //     avgLat /= region.length;
    //     avgLng /= region.length;
    //     // var content = "<div style='padding-top:10px'> Region name:&nbsp;"+
    //     //     "<input id='region-name' type='text'><br/>"+
    //     //     "<input type='button' value='enter' onclick='save()'></div>";
    //     var content = '<div>'+$('#info-window').html()+'</div>';
    //     info = new google.maps.InfoWindow({
    //         position: new google.maps.LatLng(avgLat, avgLng),
    //         content: content
    //     });
    //     info.open(map);
    //     //remove user drawn polygon
    //     e.setMap(null);
    // });
    // var self = this;
    
    // locations contains the name of the region, along with
    // the array of LatLng coordinates that defines it
// }

// function Label(options){
//     this.setMap(map.map);
//     this.set('display', 'block');
//     this.text = options.text;
//     this.point1 = options.point1;
//     this.point2 = options.point2;
//     this.div = $('<div>'+this.text+'</div>');
//     $(this.div).addClass('street-label');
// }

// Label.prototype = new google.maps.OverlayView;

// Label.prototype.onAdd = function(){
//     var pane = this.getPanes().floatPane.appendChild(this.div[0]);
//     var self = this;
//     google.maps.event.addListener(this, 'display_changed',
//         function(){ self.draw(); });
// }

// Label.prototype.draw = function(){
//     //no point in bothering with all these calculations if 
//     //we're not going to display it
//     if(this.get('display') == 'none'){
//         $(this.div).css('display', 'none')
//         return;
//     }
//     var projection = this.getProjection();
//     var position1 = projection.fromLatLngToDivPixel(this.point1);
//     var position2 = projection.fromLatLngToDivPixel(this.point2);
//     var x1 = position1.x, y1 = position1.y,
//         x2 = position2.x, y2 = position2.y;
//     var theta = Math.atan(Math.abs(y1 - y2)/
//                  Math.abs(x1 - x2))*180/Math.PI;
//     //if slope of line is negative, subtract angle by 360
//     if((y2-y1)*(x2-x1) < 0)
//         theta = 360 - theta;
//     //place div so that center of div is at the midpoint of the line
//     var xOffset = (x1 + x2 - $(this.div).outerWidth())/2;
//     var yOffset = (y1 + y2 - $(this.div).outerHeight())/2;
//     $(this.div).css({
//         display: 'block',
//         left: xOffset+'px',
//         top: yOffset+'px',
//         transform: 'rotate('+theta+'deg)',
//         '-ms-transform': 'rotate('+theta+'deg)',
//         '-webkit-transform': 'rotate('+theta+'deg)'
//     });
// }

//save newly created region
// function save(){
//     var name = $('#region-name').val();
//     locations.push(name);
//     polygons[name] = polygon;
//     createHoverOverlay(name, polygon.getPath().b)
//     info.close();
//     info.setMap(null);
//     info = null;
// }

//click handler on checkboxes for showing/hiding regions
// function draw(){
//     var name = this;
//     var checkbox = $(':checkbox[data-value="'+name+'"]');
//     if($(checkbox).is(":checked")){
//         polygons[name].setMap(map.map);
//         $(checkbox).next().addClass('image-checked');
//     }
//     else{
//         polygons[name].setMap(null);
//         $(checkbox).next().removeClass('image-checked');
//         //remove all street labels associated with the region as well
//         $.each(street_labels[name], function(){ this.set('display', 'none');});
//     }
//     return true;
// }