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


// API Key Google: AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI