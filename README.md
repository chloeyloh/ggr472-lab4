# Pedestrian & Cyclist Collision Hexgrid Map for Downtown Toronto
## GGR472 Lab 4: GIS Analaysis with Turf.js
https://chloeyloh.github.io/ggr472-lab4/

### Overview
This lab demonstrates how spatial analysis can be performed directly in the browser using Turf.js in combination with Mapbox GL JS. The web map visualizes pedestrian and cyclist collisions in Toronto between 2006 and 2021, aggregating point data into a 0.5 km hexagonal grid to highlight areas with higher concentrations of collisions.

The hexgrid approach improves readability compared to raw point data by summarizing collisions within uniform spatial units. The map includes interactive elements and a legend to help users interpret collision density across the city.

### 1. GIS Analysis with Turf.js
* **Bounding Box:** Uses `turf.envelope()` to generate a bounding polygon around the collision dataset. 
* **Bounding Box Scaling:** Applies `turf.transformScale()` to expand the bounding area so the edge points are included. 
* **Hexgrid Generation:** Uses `turf.hexGrid()` to generate a 0.5 km hexagonal grid across the study area. 
* **Collision Aggregation:** Applies `turf.collect()` to count the number of collision points within a hexagon.
* **Collision Counts:** A loop calculates the total number of collisions in each hexagon and stores the result in a `COUNT` property. 

### 2. Map Visualization and Symbology
* **Hexgrid Layer:** Displays aggregated collision counts as filled hexagons using a `step` expression.
* **Color Classification:** Hexagons are classified into four categories:
    * 1–9 collisions
    * 10–24 collisions
    * 25–39 collisions
    * 40+ collisions
* **Color Gradient:** A blue color palette highlights areas with higher collision density.

### 3. Interactivity and User Experience
* **Pop-up Windows:** Clicking a hexagon opens a popup displaying the number of collisions within that area.
* **Hover Interaction:** Cursor changes to indicate clickable features when hovering over hexagons.
* **Legend:** A custom legend explains the collision count categories and corresponding colors.

### Data Source
City of Toronto Open Data
Motor Vehicle Collisions Involving Killed or Seriously Injured Persons

https://open.toronto.ca/dataset/motor-vehicle-collisions-involving-killed-or-seriously-injured-persons/

**Author**: Chloe Loh

**Course**: GGR472 - Developing Web Maps