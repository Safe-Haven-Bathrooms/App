//Look a new js file
console.log("The js is connected")

var searchEl = $(".container");


function initGoogle() {

    if (navigator.geolocation) {
        console.log('geolocation is here!')

        navigator.geolocation.getCurrentPosition(positionCoord)
    
    } else {
        console.log('geolocation not supported)');
        map = new google.maps.Map(document.getElementById("flush"), options);
    }
};


function positionCoord (position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var options = {center: {lat: lat, lng: lng }, zoom: 8}
    console.log(lat)
    console.log(lng)

    map = new google.maps.Map(document.getElementById("flush"), options);

//  map marker
        var marker = new google.maps.Marker({
            position: { lat: lat, lng: lng},
            map: map,
            // icon:
        });

}



function getSearchResults() {

    var ada = true;
    var unisex = true;
    var lat = 42.045597;
    var lng = -87.688568;

    var refugeRestroomsURL = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=${ada}&unisex=${unisex}&lat=${lat}&lng=${lng}`
    console.log(refugeRestroomsURL)
}

getSearchResults();


function handleSearchData(event) {
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
        .then(response => response.json())
        .then(data => console.log(data))
};
searchEl.on('click', '.button', handleSearchData)


function getcityCoord(location) {

    var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI"


    fetch(googleURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json()
            }
        }).then(function (data) {
            console.log(data);
            var googleLat = data.results[0].geometry.location.lat;
            console.log(googleLat);
            var googleLon = data.results[0].geometry.location.lng;
            console.log(googleLon)
            var getCoord = 'https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=true&unisex=false&lat=' + googleLat + '&lng=' + googleLon

            fetch(getCoord).then(function (response) {
                console.log(response)
                response.json().then(function (data) {
                    console.log(data);
                });
            });
        });
};




// let APIKeyGoogle = "AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI"