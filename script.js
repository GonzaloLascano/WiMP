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



//----------------- Dummy Pathnodes ----------------

let pathPoints = [
    {
        number: 0,
        location: [553, 328],
        properties: ['leasing office']
    },
    {
        number: 1,
        location: [535, 327],
        properties: ["amenities"]
    },
    {
        number: 2,
        location: [535, 357],
        properties: ["amenities"]
    },
    {
        number: 3,
        location: [535, 380],
        properties: ["apartment 1224", "apartment 1224"]
    },
    {
        number: 4,
        location: [535, 404],
        properties: ["apartment 1226", "apartment 1227"]
    },
    {
        number: 5,
        location: [535, 435],
        properties: ["T cross"]
    },
    {
        number: 6,
        location: [593, 435],
        properties: ["apartment 1405"]
    },
    {
        number: 7,
        location: [480, 435],
        properties: ["apartment 1411"]
    },
    {
        number: 8,
        location: [443, 435],
        properties: ["apartment 1413"]
    },
    {
        number: 9,
        location: [413, 435],
        properties: ["apartment 1415"]
    },
    {
        number: 10,
        location: [535, 256],
        properties: ["apartment 1214"]
    },
    {
        number: 11,
        location: [535, 228],
        properties: ["T cross", "apartment 1212"]
    },
    {
        number: 12,
        location: [509, 228],
        properties: ["apartment 1301", "apartment 1302"]
    },
    {
        number: 13,
        location: [483, 228],
        properties: ["apartment 1303", "apartment 1304"]
    },
    {
        number: 14,
        location: [450, 228],
        properties: ["apartment 1305", "apartment 1306"]
    },
    {
        number: 15,
        location: [420, 228],
        properties: ["apartment 1307", "apartment 1308"]
    },
    {
        number: 16,
        location: [535, 200],
        properties: ["apartment 1209", "apartment 1210"]
    },    
];

let path = [
    [pathPoints[0], pathPoints[1], 1],
    [pathPoints[1],pathPoints[2], 1],
    [pathPoints[2],pathPoints[3], 1],
    [pathPoints[3],pathPoints[4], 1],
    [pathPoints[4],pathPoints[5], 2],
    [pathPoints[5],pathPoints[6], 2],
    [pathPoints[5],pathPoints[7], 2],
    [pathPoints[7],pathPoints[8], 1],
    [pathPoints[8],pathPoints[9], 4],
    [pathPoints[9],pathPoints[10], 1],
    [pathPoints[10],pathPoints[11], 1],
    [pathPoints[10],pathPoints[16], 1],
    [pathPoints[11],pathPoints[12], 1],
    [pathPoints[12],pathPoints[13], 1],
    [pathPoints[13],pathPoints[14], 1],
    [pathPoints[14],pathPoints[15], 1],
];

let pathShrt = [
    [0, 1, 1],
    [1, 2, 1],
    [2, 3, 1],
    [3, 4, 1],
    [4, 5, 2],
    [5, 6, 2],
    [5, 7, 2],
    [7, 8, 1],
    [8, 9, 4],
    [9, 10, 1],
    [10 ,11, 1],
    [10 ,16, 1],
    [11 ,12, 1],
    [12 ,13, 1],
    [13 ,14, 1],
    [14 ,15, 1],
];

let dummyResponse = [6,5,4,3,2,1,10,11,12]; //---- Simmulated API response---

function wayFinder(wayPoints) {
    let resPoints = [];
    for (let point of wayPoints) {
        resPoints.push(pathPoints[point].location);
    };
    L.marker(resPoints[0]).addTo(map).bindPopup('Start: ' + pathPoints[dummyResponse[0]].properties);
    L.marker(resPoints[resPoints.length - 1])
    .addTo(map)
    .bindPopup('Finish: ' + pathPoints[dummyResponse[dummyResponse.length - 1]].properties);
    L.polyline(resPoints, {color: 'red', weight: 4}).addTo(map);
};

wayFinder(dummyResponse);