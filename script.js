// Define map access token
mapboxgl.accessToken = mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb2Vsb2giLCJhIjoiY21sZ3UwZWYzMDIyazNocHNmcnFvbWZiNCJ9.S_Bvs5AGp4m2AF22M0fdiQ'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

// Initializing map and zoom level
const map = new mapboxgl.Map({
    container: 'map', // container id in HTML
    style: 'mapbox://styles/chloeloh/cmmpcjss4001z01qofhd064bp',  // ****ADD MAP STYLE HERE *****
    center: [-79.38, 43.71],  // starting point, longitude/latitude
    zoom: 10.5 // starting zoom level
});

// Creating new empty variable
let collisionData;

// Fetching data from the JSON file with raw URL from GitHubt repository 
fetch('https://raw.githubusercontent.com/chloeyloh/ggr472-lab4/refs/heads/main/pedcyc_collision_06-21%20copy.geojson')
    .then(response => response.json()) // Converts response to JSON format
    .then(data => {
        collisionData = data; // Stores data in the variable
        console.log(collisionData); // Logs data to the console for verification
    });

// Adding the collision data as a source and layer once the map has fully loaded
map.on('load', () => {
    // Ensures the map has loaded before trying to add the collision data as a source or layer
    if (collisionData) {
        // Create a bounding box around the collision data
        let envresult = turf.envelope(collisionData);
        // Increases size of box by 10% to ensure all points are included
        let bboxscaled = turf.transformScale(envresult, 1.1);
        // Fits the map to the bounding box
        map.fitBounds(turf.bbox(bboxscaled), {
            padding: 20
        });
        // Adds the collision data as a source to the map
        map.addSource('collisions', {
            type: 'geojson',
            data: collisionData
        });
        // Creating the hexgrid 
        let hexgrid = turf.hexGrid(turf.bbox(collisionData), 0.5, { units: 'kilometers' });
        // Aggregating the collision data to see which hexagons have the most collisions
        let collishex = turf.collect(hexgrid, collisionData, '_id', 'values');
        // Counting the points to add color to the hexagons based on the number of collisions
        let maxcollisions = 0;
        collishex.features.forEach(feature => {
            // Counting number of items in the values array for each hexagon and storing it in a new property called COUNT
            feature.properties.COUNT = feature.properties.values.length;

            // Tracking the maximum number of collisions in any hexagon to use for color scaling
            if (feature.properties.COUNT > maxcollisions) {
                maxcollisions = feature.properties.COUNT;
            }
        });
    }
});

console.log('Max Collisions:', maxcollisions); // Logs the maximum number of collisions in any hexagon for verification
