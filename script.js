// Define map access token
mapboxgl.accessToken = mapboxgl.accessToken = 'pk.eyJ1IjoiY2hsb2Vsb2giLCJhIjoiY21sZ3UwZWYzMDIyazNocHNmcnFvbWZiNCJ9.S_Bvs5AGp4m2AF22M0fdiQ'; //****ADD YOUR PUBLIC ACCESS TOKEN*****

// Initializing map and zoom level
const map = new mapboxgl.Map({
    container: 'map', // container id in HTML
    style: 'mapbox://styles/mapbox/streets-v11',  // ****ADD MAP STYLE HERE *****
    center: [-79.39, 43.65],  // starting point, longitude/latitude
    zoom: 11 // starting zoom level
});

// Creating empty variable
let collisionData;

// Fetching data from the JSON file and storing it in the variable
fetch('https://raw.githubusercontent.com/chloeyloh/ggr472-lab4/refs/heads/main/pedcyc_collision_06-21%20copy.geojson')  
    .then(response => response.json()) // Convering response to JSON format
    .then(data => {
        collisionData = data; // Storing data in the variable
        console.log(collisionData); // Logging data to the console for verification
    });

