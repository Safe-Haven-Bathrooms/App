//Look a new js file

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


fetch('https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=false&unisex=false&lat=37.7749&lng=122.4194')
    .then(response=>response.json())
    .then(data=>console.log(data))




// API Key Google: AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI