// Define map access token
mapboxgl.accessToken = mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb2Vsb2giLCJhIjoiY21sZ3UwZWYzMDIyazNocHNmcnFvbWZiNCJ9.S_Bvs5AGp4m2AF22M0fdiQ'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

// Initializing map and zoom level
const map = new mapboxgl.Map({
    container: 'map', // container id in HTML
    style: 'mapbox://styles/chloeloh/cmmpcjss4001z01qofhd064bp',  // ****ADD MAP STYLE HERE *****
    center: [-79.38, 43.71],  // starting point, longitude/latitude
    zoom: 10.5 // starting zoom level
});

let collisionData; // Variable to store collision data

// Waiting for the map to load before adding data and layers 
map.on('load', () => {

    // Fetching data from the JSON file with raw URL from GitHub repository 
    fetch('https://raw.githubusercontent.com/chloeyloh/ggr472-lab4/refs/heads/main/pedcyc_collision_06-21%20copy.geojson')
        .then(response => response.json()) // Converts response to JSON format
        .then(data => {
            collisionData = data; // Stores data in the variable
            console.log("Collision data loaded:", collisionData); // Logs data to the console for verification

            // Create a bounding box around the collision data
            let envelope = turf.envelope(collisionData);
            // Increases size of box by 10% to ensure all points are included
            let bboxScaled = turf.transformScale(envelope, 1.1);
            // Convert the scaled bounding box to an array of coordinates for fitting the map
            let bbox = turf.bbox(bboxScaled);

            // Creating the hexgrid 
            let hexgrid = turf.hexGrid(bbox, 0.5, { units: 'kilometers' });
            // Aggregating the collision data to see which hexagons have the most collisions
            let collishex = turf.collect(hexgrid, collisionData, '_id', 'values');

            // Finding the maximum number of collisions in any hexagon to use for color scaling in the visualization
            let maxcollisions = 0;

            // Looping through each hexagon feature to count the number of collisions and find the maximum count
            collishex.features.forEach(feature => {
                // Counting number of items in the values array for each hexagon and storing it in a new property called COUNT
                feature.properties.COUNT = feature.properties.values.length;

                // Tracking the maximum number of collisions in any hexagon to use for color scaling
                if (feature.properties.COUNT > maxcollisions) {
                    maxcollisions = feature.properties.COUNT;
                }
            });

            console.log('Max Collisions:', maxcollisions); // Logs the maximum number of collisions in any hexagon for verification

            // Adding the hexgrid as a source and layer to visualize the collision density
            map.addSource('collis-hexgrid', {
                type: 'geojson',
                data: collishex
            });

            // Adding a layer to visualize the hexagons with a color based on the number of collisions
            map.addLayer({
                id: 'collis-hexgrid-layer',
                type: 'fill',
                source: 'collis-hexgrid',
                paint: {
                    'fill-color': [
                        'step',
                        ['get', 'COUNT'],
                        '#f2f6ff', // 1-9 collisions
                        10, '#bdc9e1', // 10-24 collisions
                        25, '#74a9cf', // 25-39 collisions
                        40, '#0570b0' // 40+ collisions
                    ],
                    'fill-opacity': 0.6,
                    'fill-outline-color': '#e6e6e6'
                },
                // Filtering out hexagons with no collisions to improve performance and visualization
                filter: ['>', ['get', 'COUNT'], 0]
            });

            // Fitting the map to the bounds of the hexgrid to ensure all hexagons are visible
            map.fitBounds(turf.bbox(bboxScaled), {
                padding: 20
            });

            map.on('click', 'collis-hexgrid-layer', (e) => {
                const count = e.features[0].properties.COUNT; // Gets the number of collisions in the clicked hexagon
                new mapboxgl.Popup() // Creates a popup to display the number of collisions
                    .setLngLat(e.lngLat) // Sets the position of the popup to the location of the click
                    .setHTML(`<strong>Collisions:</strong> ${count}`) // Sets the content of the popup to show the number of collisions
                    .addTo(map); // Adds the popup to the map
            });

            // Adding interactivity to change the cursor when hovering over hexagons to indicate that they are clickable
            map.on('mouseenter', 'collis-hexgrid-layer', () => {
                map.getCanvas().style.cursor = 'pointer'; // Changes the cursor to a pointer when hovering over a hexagon to indicate interactivity
            });

            // Resets the cursor when not hovering over a hexagon to return to the default cursor
            map.on('mouseleave', 'collis-hexgrid-layer', () => {
                map.getCanvas().style.cursor = ''; // Resets the cursor to default
            });
        })
        .catch(error => console.error('Error loading collision data:', error)); // Logs any errors that occur during data loading
});


