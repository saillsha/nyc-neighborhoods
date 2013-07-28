/*
    This class inherits from Google Overlay and displays the labels of 
    street names. 
*/

function StreetLabel(options){
    this.setMap(gmap.map);
    this.set('display', 'block');
    this.text = options.text;
    this.point1 = options.point1;
    this.point2 = options.point2;
    this.div = $('<div>'+this.text+'</div>');
    $(this.div).addClass('street-label');
    return this;
}

StreetLabel.prototype = new google.maps.OverlayView;

StreetLabel.prototype.onAdd = function(){
    /* floatPane ensures the street label appears above all other overlays*/
    var pane = this.getPanes().floatPane.appendChild(this.div[0]);
    var self = this;
    //event handler for toggling the visibility of the labels
    google.maps.event.addListener(this, 'display_changed',
        function(){ self.draw(); });
}

StreetLabel.prototype.draw = function(){
    //no point in bothering with all these calculations if 
    //we're not going to display it
    if(this.get('display') == 'none'){
        $(this.div).css('display', 'none')
        return;
    }
    var projection = this.getProjection();
    var position1 = projection.fromLatLngToDivPixel(this.point1);
    var position2 = projection.fromLatLngToDivPixel(this.point2);
    //We need to calculate the angle of rotation and x,y position
    //of the street label so that it is centered and aligned with the boundary
    var x1 = position1.x, y1 = position1.y,
        x2 = position2.x, y2 = position2.y;
    var theta = Math.atan(Math.abs(y1 - y2)/
                 Math.abs(x1 - x2))*180/Math.PI;
    //if slope of line is negative, subtract angle by 360
    if((y2-y1)*(x2-x1) < 0)
        theta = 360 - theta;
    //place div so that center of div is at the midpoint of the line
    var xOffset = (x1 + x2 - $(this.div).outerWidth())/2;
    var yOffset = (y1 + y2 - $(this.div).outerHeight())/2;
    $(this.div).css({
        display: 'block',
        left: xOffset+'px',
        top: yOffset+'px',
        transform: 'rotate('+theta+'deg)',
        '-ms-transform': 'rotate('+theta+'deg)',
        '-webkit-transform': 'rotate('+theta+'deg)'
    });
}