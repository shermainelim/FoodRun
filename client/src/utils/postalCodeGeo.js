import * as geolib from 'geolib';

export function postalCoder(lat, long){
    const lati=lat;
    const longi=long;

    var current = {lat: lati, lng: longi}
var coords = [{name: "TPY1",lat: 1.41517413065244, lng: 103.839827784744}, {name: "TPY2",lat: 1.33781295353996, lng: 103.844331928876}, {name: "TPY3",lat: 1.33311013128172, lng:103.847431763341},{name: "TPY4",lat: 1.42966770139491, lng:103.83583915076}];

var distFromCurrent = function(coord) {
  return {coord: coord, dist: geolib.getDistance(current, coord)};
}

var closest = coords.map(distFromCurrent).sort(function(a,b)  { return a.dist - b.dist })[0];
var secondClosest = coords.map(distFromCurrent).sort(function(a,b)  { return a.dist - b.dist })[1];
var thirdClosest = coords.map(distFromCurrent).sort(function(a,b)  { return a.dist - b.dist })[2];
var fourthClosest = coords.map(distFromCurrent).sort(function(a,b)  { return a.dist - b.dist })[3];
var fifthClosest = coords.map(distFromCurrent).sort(function(a,b)  { return a.dist - b.dist })[4];

var closestFiveStores =[{name:closest.coord.name}, {name:secondClosest.coord.name},{name: thirdClosest.coord.name},{name: fourthClosest.coord.name},{name: fifthClosest.coord.name}]

return closestFiveStores;

}
