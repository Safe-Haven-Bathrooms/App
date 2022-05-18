//Look a new js file

var searchEl = $(".container");
var resultsEl = $("#results")


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
    var options = { center: { lat: lat, lng: lng }, zoom: 8 }
    console.log(lat)
    console.log(lng)

    map = new google.maps.Map(document.getElementById("flush"), options);

    //  map marker
    // var marker = new google.maps.Marker({
    //     position: { lat: lat, lng: lng},
    //     map: map,
    //     // icon:
    // });

};


function handleSearchData(event) {
    event.preventDefault();
    var inputField = $(".input")[0].value;
    console.log(inputField);

    var family = $("#family")[0].checked;
    console.log(family);

    var unisex = $("#Unisex")[0].checked;
    console.log(unisex);

    var accessible = $("#Accessible")[0].checked;
    console.log(accessible);

    if (inputField) {
        getcityCoord(inputField, unisex, accessible);
    }
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
    console.log("this is restrooms");
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
                    id: data[i].id
                    
                };
            
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
                <h3>${bathroomInfo.name}</h3>
                <li>Distance: ${distanceValue} miles from you</li>
                <li>Accessible: ${accessibleValue}</li>
                <li>Unisex: ${unisexValue}</li>
                <li>Changing Table: ${changingTableValue}</li>
                <li>Address: ${bathroomInfo.street} ${bathroomInfo.city}, ${bathroomInfo.state}</li>
                <li>Directions:  ${bathroomInfo.directions}</li>
                <li>Comments: ${bathroomInfo.comment}</li>
            `);

            // //Appends the new div underneath Google Maps
            //     $("#results").append(resultsDiv);
            };  
        });

        });
    };

function handleFavoriteButton(event) {
    event.preventDefault();

    //Identifies exact button clicked
    var favoritebtnClicked = $(event.target);

    //Traverses the DOM to find input value relative to the clicked button
    var currentInput = favoritebtnClicked.parent()[0];

    console.log("Favorite button clicked");
    console.log(currentInput);

    var currentInputId = favoritebtnClicked.parent()[0].id
    console.log(currentInputId);

    localStorage.setItem(currentInputId, currentInput.innerHTML)

}

//Click event listener for Favorite button local storage
resultsEl.on('click', '.button', handleFavoriteButton)

//Click event listenr for storage data
searchEl.on('click', '.button', handleSearchData)

// //TODO: Move this call to be upon click
// appendLocationDiv()

// let APIKeyGoogle = "AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI"





