var searchEl = $(".container");
var resultsEl = $("#results")
var bathroomsArray = [];
var searchBtn = $("#searchButton")

function initGoogle() {

    var options = {
        center: { lat: 41.8781, lng: -87.6298 },
        zoom: 10
    }

    if (navigator.geolocation) {
        console.log('geolocation is here!')

        navigator.geolocation.getCurrentPosition((positionCoord), (err) => {
                console.log("user clicked do not get location");
                map = new google.maps.Map(document.getElementById("flush"), options);
            });

    } else {
        console.log('geolocation not supported)');
        map = new google.maps.Map(document.getElementById("flush"), options);
    }
};


function positionCoord(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var coords = { lat: lat, lng: lng };
    console.log(lat)
    console.log(lng)

    map = new google.maps.Map(document.getElementById("flush"), {
        zoom:15,
        center:coords
    });

    //  map marker
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: "You Are Here",
    });

};


//Function that evaluates input critera and checkbox criteria
function handleSearchData(event) {
    event.preventDefault();

    var inputField = $(".input")[0].value;
    var unisex = $("#Unisex")[0].checked;
    var accessible = $("#Accessible")[0].checked;

    if (inputField) {
        getcityCoord(inputField, unisex, accessible);

        $(".input").val('');
    }

    // geocodeCity();
};

function geocodeCity() {

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: $(".input").val()}, function(results, status) {
        if (status === 'OK') {
            if ({results}) {
                map.setCenter(results[0].geometry.location);
        }
    }
})
};


function getcityCoord(location, unisex, accessible) {

    var googleURL = `https://maps.googleapis.com/maps/api/geocode/json?address=` + location + `&key=AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI`

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
            console.log(googleLon);
                appendLocationDiv(googleLat, googleLon, unisex, accessible);
        });
};


// Appends Location DIV to the page

function appendLocationDiv(googleLat, googleLon, unisex, accessible) {

    var restroomsURL = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=5&offset=0&ada=${accessible}&unisex=${unisex}&lat=${googleLat}&lng=${googleLon}`;
    fetch(restroomsURL).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                //List of current data to query
                var bathroomInfo = {
                    name: data[i].name,
                    distance: data[i].distance,
                    accessible: data[i].accessible,
                    unisex: data[i].unisex,
                    changingTable: data[i].changing_table,
                    street: data[i].street,
                    city: data[i].city,
                    state: data[i].state,
                    directions: data[i].directions,
                    comment: data[i].comment,
                    id: data[i].id,
                    lat: JSON.parse(data[i].latitude),
                    lng: JSON.parse(data[i].longitude)
                    
                };




            // map marker
            // var bathrromMarker = new google.maps.Marker({
            // position: {
            //     lat: bathroomInfo.lat,
            //     Lng: bathroomInfo.lng
            // },
            // map: map,
            // });
            
            //Names changing table result rendered to page
            var changingTableValue = bathroomInfo.changingTable;
            console.log(changingTableValue);
            if (changingTableValue === true) {
                changingTableValue = "Yes"
            } else {
                changingTableValue = "No"
            }

            //Converts distance value to display 2 decimal places only
            var distanceValue = bathroomInfo.distance;
            distanceValue = distanceValue.toFixed(2);

            
            //Names accessible result rendered to page
            var accessibleValue = bathroomInfo.accessible;
            if (accessibleValue === true) {
                accessibleValue = "Yes"
            } else {
                accessibleValue = "No"
            }

            var unisexValue = bathroomInfo.unisex;
            if (unisexValue === true) {
                unisexValue = "Yes"
            } else {
                unisexValue = "No"
            }


            //Results DIV with ID
            var resultsDiv = jQuery('<div>', {
                id: bathroomInfo.id,
                class: 'card'
            }).appendTo('#results');

            resultsDiv.append(`<button type="button" class="button">Favorite</button>
            `)

            resultsDiv.append(`
                <div class="bathroomDiv">
                    <h3>${bathroomInfo.name}</h3>
                    <li>Distance: ${distanceValue} miles from you</li>
                    <li>Accessible: ${accessibleValue}</li>
                    <li>Unisex: ${unisexValue}</li>
                    <li>Changing Table: ${changingTableValue}</li>
                    <li>Address: ${bathroomInfo.street} ${bathroomInfo.city}, ${bathroomInfo.state}</li>
                    <li>Directions:  ${bathroomInfo.directions}</li>
                    <li>Comments: ${bathroomInfo.comment}</li>
                </div>
            `);
            };  
        });

        });
    };

//Gets bathrooms array from local storage
function getLocalStorage() {
    //Parses value from stored bathrooms array
    var storedBathrooms = JSON.parse(localStorage.getItem("bathrooms"));

    if (storedBathrooms !== null) {
    //If the locally stored array isn't empty, update the existing array to those contents
    bathroomsArray = storedBathrooms;
    console.log("The locally stored bathrooms array isn't empty (value below):")
    console.log(bathroomsArray);
    } else {
        console.log("The locally stored bathrooms array is empty.")
    }
}

//Pushes favorite button data to stored bathrooms array
function handleFavoriteButton(event) {
    event.preventDefault();

    //Identifies favorite button clicked
    var favoritebtnClicked = $(event.target);

    //Traverses the DOM to find input value relative to the clicked button
    currentInput = favoritebtnClicked.parent()[0];

    //Pushes innerHTML value of the input into the bathrooms array
    bathroomsArray.push(currentInput.innerHTML);

    //Stringifys the bathrooms Array and stores the updated array to local storage
    localStorage.setItem("bathrooms", JSON.stringify(bathroomsArray))

}

//Gets current bathroom Array, called upon page load
getLocalStorage();

//Click event listener for Favorite button local storage
resultsEl.on('click', '.button', handleFavoriteButton)

//Click event listenr for storage data
// searchEl.on('click', '.button', handleSearchData, geocodeCity)
searchBtn.on('click', handleSearchData)








