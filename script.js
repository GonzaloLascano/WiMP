//Creating the map space with Leaflet
const map = L.map('map', {
    crs: L.CRS.Simple,
    zoom: 5,
    minZoom: 1,
    maxZoom: 1.7,
    maxBounds: [[200,0], [800,1000]]
});
const bounds = [[0,0], [1000,1000]];
const image = L.imageOverlay('./Media/TWSBlueprintBlank.png', bounds, {opacity: 0.5}).addTo(map);
map.fitBounds(bounds);
map.on('click', (e) => {
    console.log(e.latlng);
})

//Floor features

let leasingOffice = {unit:"Leasing Office", location:[553, 328]};
let apartments = [
    {number:1227, resident:"Someone",location:[550, 404]},
    {number:1226, resident:"Someone",location:[520, 404]},
    {number:1225, resident:"Someone",location:[550, 380]},
    {number:1224, resident:"Someone",location:[520, 380]},
    {number:1214, resident:"Someone",location:[550, 257]},
    {number:1212, resident:"Someone",location:[550, 228]},
    {number:1210, resident:"Someone",location:[550, 202]},
    {number:1209, resident:"Someone",location:[520, 197]},
    {number:1208, resident:"Someone",location:[550, 169]},
    {number:1207, resident:"Someone",location:[520, 167]},
    {number:1206, resident:"Someone",location:[550, 143]},
    {number:1205, resident:"Someone",location:[520, 144]},
    {number:1204, resident:"Someone",location:[550, 123]},
    {number:1203, resident:"Someone",location:[520, 123]},
    {number:1201, resident:"Someone",location:[520, 100]},
    {number:1202, resident:"Someone",location:[550, 100]},
    {number:1301, resident:"Someone", location:[508, 215]},
    {number:1302, resident:"Someone", location:[508, 240]},
    {number:1303, resident:"Someone", location:[480, 215]},
    {number:1304, resident:"Someone", location:[480, 240]},
    {number:1305, resident:"Someone", location:[450, 215]},
    {number:1306, resident:"Someone", location:[450, 240]},
    {number:1307, resident:"Someone", location:[420, 215]},
    {number:1308, resident:"Someone", location:[420, 240]},
    {number:1405, resident:"Someone", location:[593, 417]},
    {number:1411, resident:"Someone", location:[479, 417]},
    {number:1413, resident:"Someone", location:[443, 417]},
    {number:1415, resident:"Someone", location:[411, 417]},
];
let corridors = [
    [[535,435],[535, 69]],
    [[535, 69], [428, 69]],
    [[535, 69], [585, 69]],
    [[535, 228],[407, 228]],
    [[535, 435], [415, 435]],
    [[593, 435], [535, 435]]
];
let amenities = [
    {name: "amenitie", location:[553, 300]},
    {name: "amenitie", location:[520, 300]},
    {name: "amenitie", location:[520, 330]},
    {name: "amenitie", location:[520, 360]},
];


//Drawing markers in the map

let loMarker = L.marker(leasingOffice.location).addTo(map).bindPopup(leasingOffice.unit);
loMarker._icon.className += " red-hue";

apartments.forEach(unit => {L.circleMarker(unit.location, {weight: 6}).addTo(map).bindPopup(`
<b>Apartment:</b> ${unit.number}<br>
<b>Resident:</b> ${unit.resident}`)
});
amenities.forEach(amenitie => {L.circleMarker(amenitie.location, {color: "#3000ff"}).addTo(map).bindPopup(`
<b>Amenitie:</b> ${amenitie.name}`)
});
corridors.forEach((corridor) => {
    L.polyline(corridor,{weight: 5}).addTo(map);
    corridor.forEach((node) => L.circleMarker(node, {
        fillColor: "white",
        fillOpacity: 1,
    }).addTo(map))
});




