// Pull in data
const url = "";

// Initialize Map
function initMap(allData){
    var myMap = L.map("map",{
        center: [
                        37.09, -95.71,
                    ],
                    zoom: 1.5,
      });
    // add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
   // create markers for all datapoints
    L.geoJSON(allData,{
        // create the points
        pointToLayer: function(feature,latlng){
            return L.marker(latlng);
        },
        onEachFeature: function(feature,layer){
            // Update the top activities based on the location that is clicked
            layer.on({
                click: function(event){
                    updateActivities(event.target());
                },
            });
            // Create a popup for each location with relevant info
            layer.bindPopup("hi!")////////INSERT POPUP INFO HERE////////)  
        },
    }).addTo(myMap);
    



// update chart when dropdown is changed
function updateCharts(){
    // collect the new values of all dropdowns
    let monthDropdown = d3.select('#monthSelect').property("value");
    let costDropdown = d3.select('#costSelect').property("value");
    let tempDropdown = d3.select('#tempSelect').property("value");
    let sunDropdown = d3.select('#sunSelect').property("value");
    // 
};

// initialize top destinations
function initDestinations(){

};

// initialize top activities

function initActivities(){

};


// update top activities
function updateActivities(){

};

/////////////////////////////////////////////////////////////////////////
// Create function for changed month
function monthChanged(){
    updateCharts()
};

// Create function for changed cost
function costChanged(){
    updateCharts()
};
// Create function for changed temp
function tempChanged(){
    updateCharts()
};
// Create function for changed sunshine
function sunChanged(){
    updateCharts()
};

//////////////////////////////////////////////////////////////////////////
// data promise
d3.json(url).then(function(data){
    // confirm data loaded successfully
    console.log(data);
    // separate out needed data
    allData = ;
    // initialize map
    initMap(allData);
    // initialize top destinations
    initDestinations(allData);
    // initialize top activities
    initActivities(allData);
});