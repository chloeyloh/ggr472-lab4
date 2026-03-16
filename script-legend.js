// Define legend categories and corresponding colors for the hexagon layer
const legendCategories = [
    { label: '0-9 Collisions', color: '#f2f0f7' },
    { label: '10-24 Collisions', color: '#cbc9e2' },
    { label: '25-49 Collisions', color: '#9e9ac8' },
    { label: '50+ Collisions', color: '#756bb1' },
];

// Select the legend container element from the HTML
const legend = document.getElementById('legend');

// Loop through each category in the legend and create a corresponding legend item
legendCategories.forEach(category => {
    // Create a div element for the legend item
    const item = document.createElement('div');
    item.className = 'legend-item'; // Add a class for styling

    const key = document.createElement('span');
    key.className = 'legend-key'; // Add a class for styling
    key.style.backgroundColor = category.color; // Set the background color of the key to match the category color

    const value = document.createElement('span');
    value.className = 'legend-value'; // Add a class for styling
    value.textContent = category.label; // Set the text content of the value to the category label

    // Append the key and value elements to the legend item
    item.appendChild(key);
    item.appendChild(value);

    // Append the legend item to the legend container
    legend.appendChild(item);
});