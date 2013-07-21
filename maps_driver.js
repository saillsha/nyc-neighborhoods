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