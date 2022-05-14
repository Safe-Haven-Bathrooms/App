//Look a new js file
console.log("The js is connected")

var searchEl = $("#search-area");


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
    var searchBtnClicked = $(event.target);
    var inputField = searchBtnClicked.parent().children()[0].children[0].children[0].value;
    console.log(inputField);

}

searchEl.on('click', '.button', handleSearchData)


// fetch('https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada={$}&unisex=false&lat=42.045597&lng=-87.688568')
//     .then(response=>response.json())
//     .then(data=>console.log(data))




// API Key Google: AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI