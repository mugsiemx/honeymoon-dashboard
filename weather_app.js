// Weather API
//  openweathermap.org call to get json data for specific latitude/longitude locations where
//  the temperature and number of rain days are listed by month for the last year. Our assumption
//  will be that the weather will be the same in the months ahead.

// import dependencies
    // trying out new javascript library:  papaparse
    //   installed in Git Bash in the activated PythonData environment:
            // npm install papaparse
            // npm install dotenv
            // npm i node-require-function
            // npm i -s csv-writer   not using***
var csvjson = require('papaparse');
const fs = require('fs');
const Papa = require('papaparse');
require('dotenv').config({ path: require('find-config')('.env') });


// initialize the data for entry into the website before selection
//          Lexington, KY
var latitude = 38.047989
var longitude = -84.501640
const apiKey = 12345 //process.env.weatherApiKey
var monthId = 8
// var monthId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


// read the latitude/longitude data in to send to the weather api fetch
fs.readFile('./Tazia.csv', 'utf-8', (errCSV, csvLocationData) =>{
    if(error) {
        console.log(errCSV)
        throw new Error(errCSV)
    }
})


for i in csvLocationData...

    // Get the api endpoint
    // const url = "https://history.openweathermap.org/data/2.5/aggregated/month?month=2&lat=35&lon=139&appid={API key}";
    const baseUrl = 'https://history.openweathermap.org/data/2.5/aggregated/month?'
    const parms = '"month=" + monthId + "&lat=" + latitude + "&lon=" + longitude + "&appid=" + "{" + apiKey + "}")'
    url = baseUrl + parms
    // view the api endpoint for accuracy
    console.log(url)

    // fetch the weather or print the call on error response to the console
    fetch(url)
        .then(response=> {
            if(!response.ok) throw new Error(response.statusText)
            return response.json        
        })
        .then(jsonData => {
            console.log(jsonData);
        })
        .catch(console.err);


    fs.readFile(response.json, 'utf-8', (errJson, jsonData) =>{
        if(errJson) {
            console.log(errJson)
            throw new Error(errJson)
        }
        // convert json to csv
        const csvData = Papa.unparse(jsonData, {
                                    newline: '\n',
                                    header: true,
                                    skipEmptyLines: true
        })
        return csvData;
    });

// write to csv file
fs.writeFile('./weatherData.csv', csvData, errOnWriteCSV => {
    if(errOnWriteCSV) {
        console.error(errOnWriteCSV);
    };
});
