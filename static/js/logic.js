// Pull in data
const url = "https://honeymoon-dashboard-slgw.onrender.com/api/get_all";

myMap = L.map("map",{
    center: [
            25,29,
            ],
    zoom: 2,
});
// add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Initialize Map
function initMap(data){

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
    layer.removeFrom(myMap);
    
    try{filteredlayer.removeFrom(myMap)}
    catch (error){}

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
// /////////////////////// can't make filters work ////////////////////////////
    function allFilter(feature){
        if (tempFilter(feature) == true & sunFilter(feature) == true) return true
    }
    console.log(allData)
    // add new markers based on filters
    filteredlayer = L.geoJSON(allData,{
        filter: allFilter,
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

// initialize top destinations
function initDestinations(data){
// choose the top destinations 

locations=[]
for (var i=0; i<5;i++){
locations.push(data.features[i].properties)
}

// location #1
document.getElementById("flag1").src = "Images/"+locations[0].flag.image
document.getElementById("1.1").innerHTML = locations[0].name.city
document.getElementById("1.2").innerHTML = locations[0].name.country
// location #2
document.getElementById("flag2").src = "Images/"+locations[1].flag.image
document.getElementById("2.1").innerHTML = locations[1].name.city
document.getElementById("2.2").innerHTML = locations[1].name.country


// location #3
document.getElementById("flag3").src = "Images/"+locations[2].flag.image
document.getElementById("3.1").innerHTML = locations[2].name.city
document.getElementById("3.2").innerHTML = locations[2].name.country
// location #4
document.getElementById("flag4").src = "Images/"+locations[3].flag.image
document.getElementById("4.1").innerHTML = locations[3].name.city
document.getElementById("4.2").innerHTML = locations[3].name.country


// location #5
document.getElementById("flag5").src = "Images/"+locations[4].flag.image
document.getElementById("5.1").innerHTML = locations[4].name.city
document.getElementById("5.2").innerHTML = locations[4].name.country


};

// initialize top activities

function initActivities(data){
//////create the top 5 activities to have on start-up
activities=data.features[0].properties.activities

// Image 1
document.getElementById("act1").src= activities[0].image
document.getElementById("act1").alt = activities[0].name
document.getElementById("caption1").innerHTML = activities[0].name
document.getElementById("caption1").setAttribute('href',activities[0].link)
// Image 2
document.getElementById("act2").src= activities[1].image
document.getElementById("act2").alt = activities[1].name
document.getElementById("caption2").innerHTML = activities[1].name
document.getElementById("caption2").setAttribute('href',activities[1].link)
// Image 3
document.getElementById("act3").src= activities[2].image
document.getElementById("act3").alt = activities[2].name
document.getElementById("caption3").innerHTML = activities[2].name
document.getElementById("caption3").setAttribute('href',activities[2].link)
// Image 4
document.getElementById("act4").src= activities[3].image
document.getElementById("act4").alt = activities[3].name
document.getElementById("caption4").innerHTML = activities[3].name
document.getElementById("caption4").setAttribute('href',activities[3].link)
// Image 5
document.getElementById("act5").src= activities[4].image
document.getElementById("act5").alt = activities[4].name
document.getElementById("caption5").innerHTML = activities[4].name
document.getElementById("caption5").setAttribute('href',activities[4].link)
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
    allData = data
    // confirm data loaded successfully
    console.log(data);
    // initialize map
    initMap(data);
    // initialize top destinations
    initDestinations(data);
    // initialize top activities
    initActivities(data);
});