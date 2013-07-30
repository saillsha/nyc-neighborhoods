$(document).ready(function(){
    mapVM = new MapViewModel();
    ko.applyBindings(mapVM, $('#locations')[0]);
    $('#info-window').draggable();
    //hovering over a name on the checklist causes the corresponding region to be highlighted
    $('label.line').hover(
        function(){
            mapVM.regionsMap()[$(this).find('span').text()].poly.setOptions({fillOpacity: .8});
        },
        function(){
            mapVM.regionsMap()[$(this).find('span').text()].poly.setOptions({fillOpacity: .35});
        }
    );
    $(window).resize(function(){
        $('#try-me').css('visibility', 'hidden');
    })
    var left = parseFloat($('#map-canvas').css('margin-left'));
    var width = $('#map-canvas').width();
    setTimeout(function(){
    $('#try-me').css('left', (left+width/2-65)+'px')        
    }, 1000);
    maps.init();
});

var MapViewModel = function(){
    //array of regions
    var self = this;
    var localNeighborhoods = JSON.parse(localStorage['local-neighborhoods']);
    for (var i = 0; i < localNeighborhoods.length; i++) {
        //jb, kb
        var current = localNeighborhoods[i];
        for (var j = 0; j < current.path.length; j++) {
            current.path[j] = new google.maps.LatLng(current.path[j].jb, current.path[j].kb);
        }
        regions.push(localNeighborhoods[i]);
    }
    self.regions = ko.observableArray(
        regions.sort(function(a, b){
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        })
    );
    //maps region names to regions
    self.regionsMap = ko.computed(function(){
        var regMap = {};
        $.each(self.regions(), function(index, elem){
            regMap[elem.name] = elem;
        });
        return regMap;
    });
}