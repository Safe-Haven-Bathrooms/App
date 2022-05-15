//Look a new js file
console.log("The js is connected")

var searchEl = $(".container");


function initGoogle() {
    var location = {
        lat: 41.8781136,
        lng: -87.6297982
    }
    var options = {
        center: location, 
        zoom: 8
    }

     map = new google.maps.Map(document.getElementById("flush"), options);

    //  map marker
    var marker = new google.maps.Marker({
        position: {lat:42.0474906,lng:-87.68539299999999},
        map: map,
        // icon:
    });
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

    if (inputField) {
        getcityCoord(inputField);
    }
    
    //TODO: Add lat and lon values from Google Maps API
    var refugeRestroomsURL = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=${accessibleCheckbox}&unisex=${unisexCheckbox}&lat=42.045597&lng=-87.688568`
    console.log(refugeRestroomsURL);

    fetch(refugeRestroomsURL)
        .then(response=>response.json())
        .then(data=>console.log(data))

}
searchEl.on('click', '.button', handleSearchData)


function getcityCoord(location) {

    var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location +"&key=AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI"
   

    fetch(googleURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json()
            }}) .then(function (data) {
                console.log(data);
                var googleLat = data.results[0].geometry.location.lat;
                console.log(googleLat);
                var googleLon = data.results[0].geometry.location.lng;
                console.log(googleLon)
                var getCoord = 'https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=true&unisex=false&lat=' + googleLat + '&lng=' + googleLon 

                fetch(getCoord).then(function(response) {
                    console.log(response)
                    response.json().then(function(data){
                        console.log(data);
                    });
                });
            });
};
        

//  fetch('https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada={$}&unisex=false&lat=42.045597&lng=-87.688568')
// //     .then(response=>response.json())
// //     .then(data=>console.log(data))



// let APIKeyGoogle = "AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI"