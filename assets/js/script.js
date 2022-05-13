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


fetch('https://www.refugerestrooms.org/api/v1/restrooms/search?page=1&per_page=10&offset=0&ada=true&unisex=true&query=evanston')
    .then(response=>response.json())
    .then(data=>console.log(data))




// API Key Google: AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI