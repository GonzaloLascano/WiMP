// Creating the map space with Leaflet
const map = L.map('map', {
    crs: L.CRS.Simple,
    zoom: 5,
    minZoom: 1,
    maxZoom: 1.7,
    maxBounds: [[200,0], [800,1000]]
});
const bounds = [[0,0], [1000,1000]];
let floorMaps = {
    1: L.imageOverlay('./Media/TWSBlueprintBlank.png', bounds, {opacity: 0.5}),
    2: L.imageOverlay('./Media/TWSBlueprintBlank.png', bounds, {opacity: 0.5}),
    3: L.imageOverlay('./Media/TWSBlueprintBlank.png', bounds, {opacity: 0.5})
};
let currentFloor = 1;
floorMaps[currentFloor].addTo(map);
map.fitBounds(bounds);

map.on('click', (e) => {
    console.log(e.latlng);
});

// Floor data
let floorData = {
    1: {
        leasingOffice: {unit: "Leasing Office", location: [553, 328]},
        apartments: [
            {number: 1227, resident: "Someone", location: [550, 404]},
            // ... more apartments for floor 1
        ],
        corridors: [
            [[535, 435], [535, 69]],
            // ... more corridors for floor 1
        ],
        amenities: [
            {name: "Amenity", location: [553, 300]},
            // ... more amenities for floor 1
        ]
    },
    2: {
        leasingOffice: {unit: "Leasing Office", location: [553, 340]},
        apartments: [
            {number: 2227, resident: "Someone", location: [650, 404]},
            // ... more apartments for floor 2
        ],
        corridors: [
            [[535, 435], [535, 69]],
            // ... more corridors for floor 2
        ],
        amenities: [
            {name: "Amenity", location: [653, 300]},
            // ... more amenities for floor 2
        ]
    },
    3: {
        leasingOffice: {unit: "Leasing Office", location: [700, 300]},
        apartments: [
            {number: 3227, resident: "Someone", location: [750, 404]},
            // ... more apartments for floor 3
        ],
        corridors: [
            [[735, 435], [735, 69]],
            // ... more corridors for floor 3
        ],
        amenities: [
            {name: "Amenity", location: [753, 300]},
            // ... more amenities for floor 3
        ]
    }
};

// Function to draw elements on the map
function drawFloor(floor) {
    map.eachLayer(layer => {
        if (layer instanceof L.ImageOverlay || layer instanceof L.CircleMarker || layer instanceof L.Marker || layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });

    floorMaps[floor].addTo(map);

    let floorInfo = floorData[floor];
    let loMarker = L.marker(floorInfo.leasingOffice.location).addTo(map).bindPopup(floorInfo.leasingOffice.unit);
    loMarker._icon.className += " red-hue";

    floorInfo.apartments.forEach(unit => {
        L.circleMarker(unit.location, {weight: 6}).addTo(map).bindPopup(`
            <b>Apartment:</b> ${unit.number}<br>
            <b>Resident:</b> ${unit.resident}`);
    });

    floorInfo.amenities.forEach(amenity => {
        L.circleMarker(amenity.location, {color: "#3000ff"}).addTo(map).bindPopup(`
            <b>Amenity:</b> ${amenity.name}`);
    });

    floorInfo.corridors.forEach(corridor => {
        L.polyline(corridor, {weight: 5}).addTo(map);
        corridor.forEach(node => L.circleMarker(node, {
            fillColor: "white",
            fillOpacity: 1,
        }).addTo(map));
    });
}

// Function to switch floors
function switchFloor(floor) {
    if (floorMaps[floor] && floor !== currentFloor) {
        currentFloor = floor;
        drawFloor(floor);
    }
}

// Initial draw for the current floor
drawFloor(currentFloor);

// Floor switch UI (simplified example, should be adapted for real use)
let floorSwitcher = L.control({position: 'topright'});
floorSwitcher.onAdd = function(map) {
    let div = L.DomUtil.create('div', 'floor-switcher');
    div.innerHTML = `
        <button onclick="switchFloor(1)">Floor 1</button>
        <button onclick="switchFloor(2)">Floor 2</button>
        <button onclick="switchFloor(3)">Floor 3</button>
    `;
    return div;
};
floorSwitcher.addTo(map);

// Drawing markers and paths based on pathPoints (adjust to handle multiple floors)
let pathPoints = {
    1: [
        {number: 0, type: "directional", location: [553, 328], properties: ['leasing office']},
        // ... more path points for floor 1
    ],
    2: [
        {number: 0, type: "directional", location: [600, 300], properties: ['leasing office']},
        // ... more path points for floor 2
    ],
    3: [
        {number: 0, type: "directional", location: [700, 300], properties: ['leasing office']},
        // ... more path points for floor 3
    ]
};

let paths = {
    1: [
        [pathPoints[1][0], pathPoints[1][1], 1],
        // ... more paths for floor 1
    ],
    2: [
        [pathPoints[2][0], pathPoints[2][1], 1],
        // ... more paths for floor 2
    ],
    3: [
        [pathPoints[3][0], pathPoints[3][1], 1],
        // ... more paths for floor 3
    ]
};

// Map Drawing Functions
function wayFinder(floor, wayPoints) {
    let resPoints = [];
    for (let point of wayPoints) {
        resPoints.push(pathPoints[floor][point].location);
    }
    L.marker(resPoints[0]).addTo(map).bindPopup('Start: ' + pathPoints[floor][wayPoints[0]].properties);
    L.marker(resPoints[resPoints.length - 1])
        .addTo(map)
        .bindPopup('Finish: ' + pathPoints[floor][wayPoints[wayPoints.length - 1]].properties);
    L.polyline(resPoints, {color: 'red', weight: 4}).addTo(map);
}

// Verbal instructions Functions
function verbalDirections(floor, wayPoints) {
    let directions = ["Start walking down the hallway. Towards " + pathPoints[floor][wayPoints[1]].properties[0]];
    for (let point in wayPoints) {
        if (pathPoints[floor][wayPoints[point]].type === 'directional') {
            let prevPoint = pathPoints[floor][wayPoints[parseInt(point) - 1]];
            let currentPoint = pathPoints[floor][wayPoints[parseInt(point)]];
            let nextPoint = pathPoints[floor][wayPoints[parseInt(point) + 1]];

            let turnD = turnDirection(prevPoint.location, currentPoint.location, nextPoint.location);

            let verbDirection = 'At the ' + pathPoints[floor][wayPoints[point]].properties[0] + ', go ' + turnD + ' towards ' + nextPoint.properties[0] + " and continue forward.";
            directions.push(verbDirection);
        }
    }
    directions.push("Your destination, is down this hallway.");
    console.log(directions);
}

let dummyResponseFloor1 = [0, 1, 2, 3, 4, 5, 6]; // Simulated API response for floor 1
let dummyResponseFloor2 = [0, 1, 2, 3, 4, 5, 6]; // Simulated API response for floor 2

wayFinder(1, dummyResponseFloor1);
verbalDirections(1, dummyResponseFloor1);

wayFinder(2, dummyResponseFloor2);
verbalDirections(2, dummyResponseFloor2);
