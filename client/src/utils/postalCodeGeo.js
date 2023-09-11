import * as geolib from 'geolib';

var current = {lat: 1.33805369690152, lng: 103.857286902601}
var coords = [{name: "TPY1",lat: 1.41517413065244, lng: 103.839827784744}, {name: "TPY2",lat: 1.33781295353996, lng: 103.844331928876}, {name: "TPY3",lat: 1.33311013128172, lng:103.847431763341},{name: "TPY4",lat: 1.42966770139491, lng:103.83583915076}];

var distFromCurrent = function(coord) {
  return {coord: coord, dist: geolib.getDistance(current, coord)};
}

var closest = coords.map(distFromCurrent).sort(function(a,b)  { return a.dist - b.dist })[0];
var secondClosest = coords.map(distFromCurrent).sort(function(a,b)  { return a.dist - b.dist })[1];

console.log("Closest: " + closest.coord.name + closest.coord.lat + ", " + closest.coord.lng);

console.log("secondClosest: " +closest.coord.name + secondClosest.coord.lat + ", " + secondClosest.coord.lng);