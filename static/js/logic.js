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
    let costDropdown = d3.select('#costSelect').property("value");
    let tempDropdown = d3.select('#tempSelect').property("value");
    let sunDropdown = d3.select('#sunSelect').property("value");
    // clear all markers from map
    layer.removeFrom(myMap);
    
    try{filteredlayer.removeFrom(myMap)}
    catch (error){}

    // Filter the data based on the dropdowns
    function allFilter(feature){
        if(tempDropdown === "all") var temp=true
        else if(tempDropdown === "45") Tmin = -10, Tmax = 45
        else if (tempDropdown === "60") Tmin = 45, Tmax = 60
        else if (tempDropdown === "70") Tmin = 60, Tmax = 70
        else if (tempDropdown === "80") Tmin = 70, Tmax = 80
        else if (tempDropdown === "100") Tmin = 80, Tmax = 100

        if(tempDropdown === "all") var temp=true
        else if (feature.properties.avgTemp[monthDropdown] < Tmax & feature.properties.avgTemp[monthDropdown]> Tmin) temp=true
        
        if(sunDropdown === "all") var sun=true
        else if(sunDropdown ==="one") Smin = 0, Smax = (30*.1)
        else if (sunDropdown === "two") Smin = (30*.1), Smax = (30*.2)
        else if (sunDropdown === "three") Smin = (30*.2), Smax = (30*.3)
        else if (sunDropdown === "four") Smin = (30*.3), Smax = (30*.5)
        else if (sunDropdown === "five") Smin = (30*.5), Smax = 35
        
        if(sunDropdown === "all") sun=true
        else if(feature.properties.sunDays[monthDropdown] < Smax & feature.properties.sunDays[monthDropdown]> Smin) var sun=true
    
        if(costDropdown ==="all") var cost=true
        else if(costDropdown==="one") Cmax= 1
        else if(costDropdown==="two") Cmax=2
        else if(costDropdown==="three") Cmax=3
        else if(costDropdown ==="four") Cmax=4
        else if(costDropdown==="five") Cmax=5

        if(costDropdown==="all") cost=true
        else if(feature.properties.costRank < Cmax) var cost=true

        if(temp===true & sun===true & cost===true) return true
    }
    console.log()
    locationList = []
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
            layer.bindPopup(feature.properties.name.city + ", " + feature.properties.name.country);
            locationList.push(feature.properties)  
        },    
        }).addTo(myMap);
    // location #1
    updateDestinations(locationList)
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
document.getElementById("1.3").innerHTML = locations[0].costRank + "/5"
// location #2
document.getElementById("flag2").src = "Images/"+locations[1].flag.image
document.getElementById("2.1").innerHTML = locations[1].name.city
document.getElementById("2.2").innerHTML = locations[1].name.country
document.getElementById("2.3").innerHTML = locations[1].costRank + "/5"

// location #3
document.getElementById("flag3").src = "Images/"+locations[2].flag.image
document.getElementById("3.1").innerHTML = locations[2].name.city
document.getElementById("3.2").innerHTML = locations[2].name.country
document.getElementById("3.3").innerHTML = locations[2].costRank + "/5"

// location #4
document.getElementById("flag4").src = "Images/"+locations[3].flag.image
document.getElementById("4.1").innerHTML = locations[3].name.city
document.getElementById("4.2").innerHTML = locations[3].name.country
document.getElementById("4.3").innerHTML = locations[3].costRank + "/5"

// location #5
document.getElementById("flag5").src = "Images/"+locations[4].flag.image
document.getElementById("5.1").innerHTML = locations[4].name.city
document.getElementById("5.2").innerHTML = locations[4].name.country
document.getElementById("5.3").innerHTML = locations[4].costRank + "/5"


};

// initialize top activities

function initActivities(data){
//////create the top 5 activities to have on start-up
activities=data.features[0].properties.activities
console.log(activities[0])
// Image 1
document.getElementById("act1").src= activities[0][0].image
document.getElementById("act1").alt = activities[0][0].name
document.getElementById("caption1").innerHTML = activities[0][0].name
document.getElementById("caption1").setAttribute('href',activities[0][0].link)
// Image 2
document.getElementById("act2").src= activities[0][1].image
document.getElementById("act2").alt = activities[0][1].name
document.getElementById("caption2").innerHTML = activities[0][1].name
document.getElementById("caption2").setAttribute('href',activities[0][1].link)
// Image 3
document.getElementById("act3").src= activities[0][2].image
document.getElementById("act3").alt = activities[0][2].name
document.getElementById("caption3").innerHTML = activities[0][2].name
document.getElementById("caption3").setAttribute('href',activities[0][2].link)
// Image 4
document.getElementById("act4").src= activities[0][3].image
document.getElementById("act4").alt = activities[0][3].name
document.getElementById("caption4").innerHTML = activities[0][3].name
document.getElementById("caption4").setAttribute('href',activities[0][3].link)
// Image 5
document.getElementById("act5").src= activities[0][4].image
document.getElementById("act5").alt = activities[0][4].name
document.getElementById("caption5").innerHTML = activities[0][4].name
document.getElementById("caption5").setAttribute('href',activities[0][4].link)
};

// update top activities
function updateActivities(location){
    /// get activities
    activitySample = location.feature.properties.activities[0]
    console.log(activitySample.length)
    if (activitySample.length == 5){
    // Image 1
        document.getElementById("act1").src= activitySample[0].image
        document.getElementById("act1").alt = activitySample[0].name
        document.getElementById("caption1").innerHTML = activitySample[0].name
        document.getElementById("caption1").setAttribute('href',activitySample[0].link)
        // Image 2
        document.getElementById("act2").src= activitySample[1].image
        document.getElementById("act2").alt = activitySample[1].name
        document.getElementById("caption2").innerHTML = activitySample[1].name
        document.getElementById("caption2").setAttribute('href',activitySample[1].link)
        // Image 3
        document.getElementById("act3").src= activitySample[2].image
        document.getElementById("act3").alt = activitySample[2].name
        document.getElementById("caption3").innerHTML = activitySample[2].name
        document.getElementById("caption3").setAttribute('href',activitySample[2].link)
        // Image 4
        document.getElementById("act4").src= activitySample[3].image
        document.getElementById("act4").alt = activitySample[3].name
        document.getElementById("caption4").innerHTML = activitySample[3].name
        document.getElementById("caption4").setAttribute('href',activitySample[3].link)
        // Image 5
        document.getElementById("act5").src= activitySample[4].image
        document.getElementById("act5").alt = activitySample[4].name
        document.getElementById("caption5").innerHTML = activitySample[4].name
        document.getElementById("caption5").setAttribute('href',activitySample[4].link)}

    else if (activitySample.length == 4){
        // Image 1
        document.getElementById("act1").src= activitySample[0].image
        document.getElementById("act1").alt = activitySample[0].name
        document.getElementById("caption1").innerHTML = activitySample[0].name
        document.getElementById("caption1").setAttribute('href',activitySample[0].link)
        // Image 2
        document.getElementById("act2").src= activitySample[1].image
        document.getElementById("act2").alt = activitySample[1].name
        document.getElementById("caption2").innerHTML = activitySample[1].name
        document.getElementById("caption2").setAttribute('href',activitySample[1].link)
        // Image 3
        document.getElementById("act3").src= activitySample[2].image
        document.getElementById("act3").alt = activitySample[2].name
        document.getElementById("caption3").innerHTML = activitySample[2].name
        document.getElementById("caption3").setAttribute('href',activitySample[2].link)
        // Image 4
        document.getElementById("act4").src= activitySample[3].image
        document.getElementById("act4").alt = activitySample[3].name
        document.getElementById("caption4").innerHTML = activitySample[3].name
        document.getElementById("caption4").setAttribute('href',activitySample[3].link)
        // Image 5
        document.getElementById("act5").src= activitySample[3].image
        document.getElementById("act5").alt = activitySample[3].name
        document.getElementById("caption5").innerHTML = activitySample[3].name
        document.getElementById("caption5").setAttribute('href',activitySample[3].link)} 
    else if (activitySample.length == 3){
        // Image 1
        document.getElementById("act1").src= activitySample[0].image
        document.getElementById("act1").alt = activitySample[0].name
        document.getElementById("caption1").innerHTML = activitySample[0].name
        document.getElementById("caption1").setAttribute('href',activitySample[0].link)
        // Image 2
        document.getElementById("act2").src= activitySample[1].image
        document.getElementById("act2").alt = activitySample[1].name
        document.getElementById("caption2").innerHTML = activitySample[1].name
        document.getElementById("caption2").setAttribute('href',activitySample[1].link)
        // Image 3
        document.getElementById("act3").src= activitySample[2].image
        document.getElementById("act3").alt = activitySample[2].name
        document.getElementById("caption3").innerHTML = activitySample[2].name
        document.getElementById("caption3").setAttribute('href',activitySample[2].link)
        // Image 4
        document.getElementById("act4").src= activitySample[2].image
        document.getElementById("act4").alt = activitySample[2].name
        document.getElementById("caption4").innerHTML = activitySample[2].name
        document.getElementById("caption4").setAttribute('href',activitySample[2].link)
        // Image 5
        document.getElementById("act5").src= activitySample[2].image
        document.getElementById("act5").alt = activitySample[2].name
        document.getElementById("caption5").innerHTML = activitySample[2].name
        document.getElementById("caption5").setAttribute('href',activitySample[2].link)}                                            
    else if (activitySample.length == 2){
        // Image 1              
        document.getElementById("act1").src= activitySample[0].image
        document.getElementById("act1").alt = activitySample[0].name
        document.getElementById("caption1").innerHTML = activitySample[0].name
        document.getElementById("caption1").setAttribute('href',activitySample[0].link)
        // Image 2
        document.getElementById("act2").src= activitySample[1].image
        document.getElementById("act2").alt = activitySample[1].name
        document.getElementById("caption2").innerHTML = activitySample[1].name
        document.getElementById("caption2").setAttribute('href',activitySample[1].link)
        // Image 3
        document.getElementById("act3").src= activitySample[1].image
        document.getElementById("act3").alt = activitySample[1].name
        document.getElementById("caption3").innerHTML = activitySample[1].name
        document.getElementById("caption3").setAttribute('href',activitySample[1].link)
        // Image 4
        document.getElementById("act4").src= activitySample[1].image
        document.getElementById("act4").alt = activitySample[1].name
        document.getElementById("caption4").innerHTML = activitySample[1].name
        document.getElementById("caption4").setAttribute('href',activitySample[1].link)
        // Image 5
        document.getElementById("act5").src= activitySample[1].image
        document.getElementById("act5").alt = activitySample[1].name
        document.getElementById("caption5").innerHTML = activitySample[1].name
        document.getElementById("caption5").setAttribute('href',activitySample[1].link)} 
    else if (activitySample.length == 1){
        // Image 1
        document.getElementById("act1").src= activitySample[0].image
        document.getElementById("act1").alt = activitySample[0].name
        document.getElementById("caption1").innerHTML = activitySample[0].name
        document.getElementById("caption1").setAttribute('href',activitySample[0].link)
        // Image 2
        document.getElementById("act2").src= activitySample[0].image
        document.getElementById("act2").alt = activitySample[0].name
        document.getElementById("caption2").innerHTML = activitySample[0].name
        document.getElementById("caption2").setAttribute('href',activitySample[0].link)
        // Image 3
        document.getElementById("act3").src= activitySample[0].image
        document.getElementById("act3").alt = activitySample[0].name
        document.getElementById("caption3").innerHTML = activitySample[0].name
        document.getElementById("caption3").setAttribute('href',activitySample[0].link)
        // Image 4
        document.getElementById("act4").src= activitySample[0].image
        document.getElementById("act4").alt = activitySample[0].name
        document.getElementById("caption4").innerHTML = activitySample[0].name
        document.getElementById("caption4").setAttribute('href',activitySample[0].link)
        // Image 5
        document.getElementById("act5").src= activitySample[0].image
        document.getElementById("act5").alt = activitySample[0].name
        document.getElementById("caption5").innerHTML = activitySample[0].name
        document.getElementById("caption5").setAttribute('href',activitySample[0].link)} 
};          

function updateDestinations(data){
    if(data.length ===0){
        document.getElementById("flag1").src = "Images/house.jpg"
        document.getElementById("1.1").innerHTML = "Stay"
        document.getElementById("1.2").innerHTML = "Home"
        document.getElementById("1.3").innerHTML = "$0"
        document.getElementById("flag2").src = "Images/house.jpg"
        document.getElementById("2.1").innerHTML = "Stay"
        document.getElementById("2.2").innerHTML = "Home"
        document.getElementById("2.3").innerHTML = "$0"
        document.getElementById("flag3").src = "Images/house.jpg"
        document.getElementById("3.1").innerHTML = "Stay"
        document.getElementById("3.2").innerHTML = "Home"
        document.getElementById("3.3").innerHTML = "$0"
        document.getElementById("flag4").src = "Images/house.jpg"
        document.getElementById("4.1").innerHTML = "Stay"
        document.getElementById("4.2").innerHTML = "Home"
        document.getElementById("4.3").innerHTML = "$0"
        document.getElementById("flag5").src = "Images/house.jpg"
        document.getElementById("5.1").innerHTML = "Stay"
        document.getElementById("5.2").innerHTML = "Home"
        document.getElementById("5.3").innerHTML = "$0"    }        
    else if(data.length === 1){
        document.getElementById("flag1").src = "Images/"+data[0].flag.image
        document.getElementById("1.1").innerHTML = data[0].name.city
        document.getElementById("1.2").innerHTML = data[0].name.country
        document.getElementById("1.3").innerHTML = data[0].costRank + "/5"
        document.getElementById("flag2").src = "Images/house.jpg"
        document.getElementById("2.1").innerHTML = "Stay"
        document.getElementById("2.2").innerHTML = "Home"
        document.getElementById("2.3").innerHTML = "$0"
        document.getElementById("flag3").src = "Images/house.jpg"
        document.getElementById("3.1").innerHTML = "Stay"
        document.getElementById("3.2").innerHTML = "Home"
        document.getElementById("3.3").innerHTML = "$0"
        document.getElementById("flag4").src = "Images/house.jpg"
        document.getElementById("4.1").innerHTML = "Stay"
        document.getElementById("4.2").innerHTML = "Home"
        document.getElementById("4.3").innerHTML = "$0"
        document.getElementById("flag5").src = "Images/house.jpg"
        document.getElementById("5.1").innerHTML = "Stay"
        document.getElementById("5.2").innerHTML = "Home"
        document.getElementById("5.3").innerHTML = "$0"   }
    else if(data.length === 2){
        document.getElementById("flag1").src = "Images/"+data[0].flag.image
        document.getElementById("1.1").innerHTML = data[0].name.city
        document.getElementById("1.2").innerHTML = data[0].name.country
        document.getElementById("1.3").innerHTML = data[0].costRank + "/5"
        document.getElementById("flag2").src = "Images/"+data[1].flag.image
        document.getElementById("2.1").innerHTML = data[1].name.city
        document.getElementById("2.2").innerHTML = data[1].name.country
        document.getElementById("2.3").innerHTML = data[1].costRank + "/5"
        document.getElementById("flag3").src = "Images/house.jpg"
        document.getElementById("3.1").innerHTML = "Stay"
        document.getElementById("3.2").innerHTML = "Home"
        document.getElementById("3.3").innerHTML = "$0"
        document.getElementById("flag4").src = "Images/house.jpg"
        document.getElementById("4.1").innerHTML = "Stay"
        document.getElementById("4.2").innerHTML = "Home"
        document.getElementById("4.3").innerHTML = "$0"
        document.getElementById("flag5").src = "Images/house.jpg"
        document.getElementById("5.1").innerHTML = "Stay"
        document.getElementById("5.2").innerHTML = "Home"
        document.getElementById("5.3").innerHTML = "$0"   } 
    else if(data.length === 3){
        document.getElementById("flag1").src = "Images/"+data[0].flag.image
        document.getElementById("1.1").innerHTML = data[0].name.city
        document.getElementById("1.2").innerHTML = data[0].name.country
        document.getElementById("1.3").innerHTML = data[0].costRank + "/5"
        document.getElementById("flag2").src = "Images/"+data[1].flag.image
        document.getElementById("2.1").innerHTML = data[1].name.city
        document.getElementById("2.2").innerHTML = data[1].name.country
        document.getElementById("2.3").innerHTML = data[1].costRank + "/5"
        document.getElementById("flag3").src = "Images/"+data[2].flag.image
        document.getElementById("3.1").innerHTML = data[2].name.city
        document.getElementById("3.2").innerHTML = data[2].name.country
        document.getElementById("3.3").innerHTML = data[2].costRank + "/5"
        document.getElementById("flag4").src = "Images/house.jpg"
        document.getElementById("4.1").innerHTML = "Stay"
        document.getElementById("4.2").innerHTML = "Home"
        document.getElementById("4.3").innerHTML = "$0"
        document.getElementById("flag5").src = "Images/house.jpg"
        document.getElementById("5.1").innerHTML = "Stay"
        document.getElementById("5.2").innerHTML = "Home"
        document.getElementById("5.3").innerHTML = "$0"    } 
    else if(data.length === 4){
        document.getElementById("flag1").src = "Images/"+data[0].flag.image
        document.getElementById("1.1").innerHTML = data[0].name.city
        document.getElementById("1.2").innerHTML = data[0].name.country
        document.getElementById("1.3").innerHTML = data[0].costRank + "/5"
        document.getElementById("flag2").src = "Images/"+data[1].flag.image
        document.getElementById("2.1").innerHTML = data[1].name.city
        document.getElementById("2.2").innerHTML = data[1].name.country
        document.getElementById("2.3").innerHTML = data[1].costRank + "/5"
        document.getElementById("flag3").src = "Images/"+data[2].flag.image
        document.getElementById("3.1").innerHTML = data[2].name.city
        document.getElementById("3.2").innerHTML = data[2].name.country
        document.getElementById("3.3").innerHTML = data[2].costRank + "/5"
        document.getElementById("flag4").src = "Images/"+data[3].flag.image
        document.getElementById("4.1").innerHTML = data[3].name.city
        document.getElementById("4.2").innerHTML = data[3].name.country
        document.getElementById("4.3").innerHTML = data[3].costRank + "/5"
        document.getElementById("flag5").src = "Images/house.jpg"
        document.getElementById("5.1").innerHTML = "Stay"
        document.getElementById("5.2").innerHTML = "Home"
        document.getElementById("5.3").innerHTML = "$0"  }
    else if(data.length >4){
        document.getElementById("flag1").src = "Images/"+data[0].flag.image
        document.getElementById("1.1").innerHTML = data[0].name.city
        document.getElementById("1.2").innerHTML = data[0].name.country
        document.getElementById("1.3").innerHTML = data[0].costRank + "/5"
        document.getElementById("flag2").src = "Images/"+data[1].flag.image
        document.getElementById("2.1").innerHTML = data[1].name.city
        document.getElementById("2.2").innerHTML = data[1].name.country
        document.getElementById("2.3").innerHTML = data[1].costRank + "/5"
        document.getElementById("flag3").src = "Images/"+data[2].flag.image
        document.getElementById("3.1").innerHTML = data[2].name.city
        document.getElementById("3.2").innerHTML = data[2].name.country
        document.getElementById("3.3").innerHTML = data[2].costRank + "/5"
        document.getElementById("flag4").src = "Images/"+data[3].flag.image
        document.getElementById("4.1").innerHTML = data[3].name.city
        document.getElementById("4.2").innerHTML = data[3].name.country
        document.getElementById("4.3").innerHTML = data[3].costRank + "/5"
        document.getElementById("flag5").src = "Images/"+data[4].flag.image
        document.getElementById("5.1").innerHTML = data[4].name.city
        document.getElementById("5.2").innerHTML = data[4].name.country
        document.getElementById("5.3").innerHTML = data[4].costRank + "/5"
    }        
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