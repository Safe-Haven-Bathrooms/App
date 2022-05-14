//Look a new js file
console.log("The js is connected")

var searchEl = $(".container");


function initGoogle() {
    var location = {
        lat: 37.0902,
        lng: 95.7129
    }
    var options = {
        center: location, 
        zoom: 9
    }

     map = new google.maps.Map(document.getElementById("flush"), options);
}


function getSearchResults () {
    
    var ada = true;
    var unisex = true;
    var lat = 42.045597;
    var lng = -87.688568;

    var refugeRestroomsURL = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=${ada}&unisex=${unisex}&lat=${lat}&lng=${lng}`
    console.log(refugeRestroomsURL)
}

getSearchResults();


function handleSearchData (event) {
    event.preventDefault();
    var inputField = $(".input")[0].value;
    console.log(inputField);

    var familyCheckbox = $("#family")[0].checked;
    console.log(familyCheckbox);

    var unisexCheckbox = $("#Unisex")[0].checked;
    console.log(unisexCheckbox);

    var accessibleCheckbox = $("#Accessible")[0].checked;
    console.log(accessibleCheckbox);
    
    //TODO: Add lat and lon values from Google Maps API
    var refugeRestroomsURL = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=${accessibleCheckbox}&unisex=${unisexCheckbox}&lat=42.045597&lng=-87.688568`
    console.log(refugeRestroomsURL);

    fetch(refugeRestroomsURL)
        .then(response=>response.json())
        .then(data=>console.log(data))

}
searchEl.on('click', '.button', handleSearchData)


// fetch('https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada={$}&unisex=false&lat=42.045597&lng=-87.688568')
//     .then(response=>response.json())
//     .then(data=>console.log(data))




// API Key Google: AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI