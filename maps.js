maps = {};

maps.init = function(){
    gmap = new GMaps({
        div: '#map-canvas',
        lat: 40.75,
        lng: -74,
        zoom: 12
    });
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON,
        ]
      }
    });
    drawingManager.setMap(gmap.map);
}