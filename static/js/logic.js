// Pull in data
const url = "";

// Initialize Map
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


// update chart when dropdown is changed
function updateChart(){
    let monthDropdown = d3.select('#monthSelect').property("value");
    let costDropdown = d3.select('#costSelect').property("value");
    let tempDropdown = d3.select('#tempSelect').property("value");
    let sunDropdown = d3.select('#sunSelect').property("value");
    //// add 
}

// initialize top destinations


// initialize top activities






/////////////////////////////////////////////////////////////////////////
// Create function for changed month
function monthChanged(){
    updateChart()
};

// Create function for changed cost
function costChanged(){
    updateChart()
}
// Create function for changed temp
function tempChanged(){
    updateChart()
}
// Create function for changed sunshine
function sunChanged(){
    updateChart()
}

//////////////////////////////////////////////////////////////////////////
// data promise
d3.json(url).then(function(data){
    // confirm data loaded successfully
    console.log(data);
    // separate out needed data

    // initialize map

    // initialize top destinations

    // initialize top activities
});