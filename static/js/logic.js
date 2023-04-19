// Pull in data
const url = "https://honeymoon-dashboard-slgw.onrender.com/api/get_all";

// Initialize Map
function initMap(data){
    myMap = L.map("map",{
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
    layer = L.geoJSON(data,{
        // create the points
        pointToLayer: function(feature,latlng){
            return L.marker(latlng);
        },
        onEachFeature: function(feature,layer){
            // Update the top activities based on the location that is clicked
            layer.on({
                click: function(event){
                    updateActivities(event.target);
                },
            });
            // Create a popup for each location with relevant info
            layer.bindPopup(feature.properties.name.city + ", " + feature.properties.name.country)////////INSERT POPUP INFO HERE////////)  
        },
    }).addTo(myMap);
};



// update chart when dropdown is changed
function updateCharts(){
    // collect the new values of all dropdowns
    let monthDropdown = d3.select('#monthSelect').property("value");
    // let costDropdown = d3.select('#costSelect').property("value");
    let tempDropdown = d3.select('#tempSelect').property("value");
    let sunDropdown = d3.select('#sunSelect').property("value");

    // clear all markers from map
    layer.removeFrom(myMap)
    // create new dataset
    function tempFilter(feature){
        if(tempDropdown = "all") return true
        else if(tempDropdown = "32") min = -10, max = 32
        else if (tempDropdown = "50") min = 32, max = 50
        else if (tempDropdown = "70") min = 50, max = 70
        else if (tempDropdown = "80") min = 70, max = 80
        else if (tempDropdown = "100") min = 80, max = 100

        if(monthDropdown = 'all') 
            if(average(feature.properties.avgTemp) < max & average(feature.properties.avgTemp) > min) return true
        else if(feature.properties.avgTemp[monthDropdown] < max & feature.properties.avgTemp[monthDropdown]> min) return true
    }
    function sunFilter(feature){
        if(sunDropdown = "all") return true
        else if(sunDropdown = "one") min = 0, max = (30*.1)
        else if (sunDropdown = "two") min = (30*.1), max = (30*.3)
        else if (sunDropdown = "three") min = (30*.3), max = (30*.5)
        else if (sunDropdown = "four") min = (30*.5), max = (30*.7)
        else if (sunDropdown = "five") min = (30*.7), max = 35

        if(monthDropdown = 'all') 
            if(average(feature.properties.sunDays) < max & average(feature.properties.sunDays) > min) return true
        else if(feature.properties.sunDays[monthDropdown] < max & feature.properties.sunDays[monthDropdown]> min) return true
    }

    function allFilter(feature){
        if (tempFilter(feature) == true & sunFilter(feature) == true) return true
    }
    console.log(allData)
    // add new markers based on filters
    L.geoJSON(allData,{
        filter: allFilter,
        pointToLayer: function(feature,latlng){
            return L.marker(latlng);
        },
        
    });
};

// initialize top destinations
function initDestinations(){
// choose the top destinations 

};

// initialize top activities

function initActivities(){
//////create the top 5 activities to have on start-up
};


// update top activities
function updateActivities(location){
    /// get activities based on latlng combo
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
    allData = Object.values(data.features)
    // confirm data loaded successfully
    console.log(data);
    // initialize map
    initMap(data);
    // initialize top destinations
    initDestinations(data);
    // initialize top activities
    initActivities(data);
});