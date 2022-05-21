var searchEl = $(".container");
var resultsEl = $("#results");
var bathroomsArray = [];
var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
var myStyle = [
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [
        { saturation: -20 },
        { hue: "#FFFF8F" }
      ]
    },{
      featureType: "landscape",
      elementType: "all",
      stylers: [
        { hue: "#FFFF8F" },
        { saturation: -20 }
      ]
    },{
      featureType: "poi",
      elementType: "all",
      stylers: [
        { hue: "#FFFF8F" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "all",
      stylers: [
        { hue: "#FFFF8F" },
        { saturation: -20 }
      ]
    },{
      featureType: "transit",
      elementType: "all",
      stylers: [
        { hue: "#FFFF8F" },
        { saturation: -20 }
      ]
    },{
      featureType: "water",
      elementType: "all",
      stylers: [
        { hue: "#FFFF8F" },
        { saturation: -20 }
      ]
    }
  ]

function initGoogle() {

    var options = {
        center: { lat: 41.8781, lng: -87.6298 },
        zoom: 13,
        styles: myStyle
    };



    if (navigator.geolocation) {
        console.log("geolocation is here!");

        navigator.geolocation.getCurrentPosition(positionCoord, (err) => {
            console.log("user clicked do not get location");
            map = new google.maps.Map(document.getElementById("flush"), options);
        });
    } else {
        console.log("geolocation not supported)");
        map = new google.maps.Map(document.getElementById("flush"), options);
    }
}

function positionCoord(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var coords = { lat: lat, lng: lng };
    console.log(lat);
    console.log(lng);

    map = new google.maps.Map(document.getElementById("flush"), {
        zoom: 15,
        center: coords,
        styles: myStyle
    });

    //  map marker
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: "You Are Here",
        icon: "./assets/images/tp copy.png"
    });
}

//Function that evaluates input critera and checkbox criteria
function handleSearchData(event) {
    event.preventDefault();

    var inputField = $(".input")[0].value;
    var unisex = $("#Unisex")[0].checked;
    var accessible = $("#Accessible")[0].checked;

    if (inputField) {
        getcityCoord(inputField, unisex, accessible);

        $(".input").val("");
    }

    geocodeCity(inputField);
}

// function that takes input value and renders location on the map
function geocodeCity(inputField) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: inputField }, function (results, status) {
        if (status === "OK") {
            if ({ results }) {
                map.setCenter(results[0].geometry.location);
            }
        }
    });
}

// Gets the latitude and longitde of the inputfield
function getcityCoord(location, unisex, accessible) {
    var googleURL =
        `https://maps.googleapis.com/maps/api/geocode/json?address=` +
        location +
        `&key=AIzaSyD4lXBd-dHyZAy38GTGB99wwHqPgpS9JuI`;

    fetch(googleURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);
            var googleLat = data.results[0].geometry.location.lat;
            console.log(googleLat);
            var googleLon = data.results[0].geometry.location.lng;
            console.log(googleLon);
            appendLocationDiv(googleLat, googleLon, unisex, accessible);
        });
}

// Appends Location DIV to the page

function appendLocationDiv(googleLat, googleLon, unisex, accessible) {
    var restroomsURL = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=5&offset=0&ada=${accessible}&unisex=${unisex}&lat=${googleLat}&lng=${googleLon}`;
    resultsEl.html("");

    fetch(restroomsURL).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            //   resultsEl.innerHTML = "";
            for (var i = 0; i < data.length; i++) {
                //List of current data to query

                // if (data[i].name === data[i+1].name) {
                //     console.log("they match")
                // }
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
                    lng: JSON.parse(data[i].longitude),
                };


                // Bathroom Marker
                let bathroomMarker = new google.maps.Marker({
                    position: {
                        lat: bathroomInfo.lat,
                        lng: bathroomInfo.lng,
                    },
                    label: labels[labelIndex++ % labels.length],
                    map: map,
                    title: data[i].name,
                    icon: "./assets/images/tp copy.png"
                });

                //Adds the Infowindow to the Bathroom Markers
                let infowindow = new google.maps.InfoWindow({
                    content: `
            <h3>${bathroomInfo.name}</h3>
            <p>${bathroomInfo.street} <br>
            ${bathroomInfo.city}, ${bathroomInfo.state} <br>
            <b>Distance:</b> ${Math.round(bathroomInfo.distance * 100) / 100} miles <br>
            ${bathroomInfo.changingTable ? 'has changing table<br>' : ''}
            ${bathroomInfo.accessible ? 'It is accessible<br>' : ''}
            ${bathroomInfo.unisex ? 'Unisex<br>' : ''}</p>`,
                    maxWidth: 200,

                });

                // Adds listener to markers
                google.maps.event.addListener(bathroomMarker, 'click', function () {
                    infowindow.open(map, bathroomMarker);
                    console.log('click')
                });


                //Names changing table result rendered to page
                var changingTableValue = bathroomInfo.changingTable;
                console.log(changingTableValue);
                if (changingTableValue === true) {
                    changingTableValue = "Yes";
                } else {
                    changingTableValue = "No";
                }

                //Converts distance value to display 2 decimal places only
                var distanceValue = bathroomInfo.distance;
                distanceValue = distanceValue.toFixed(2);

                //Names accessible result rendered to page
                var accessibleValue = bathroomInfo.accessible;
                if (accessibleValue === true) {
                    accessibleValue = "Yes";
                } else {
                    accessibleValue = "No";
                }

                var unisexValue = bathroomInfo.unisex;
                if (unisexValue === true) {
                    unisexValue = "Yes";
                } else {
                    unisexValue = "No";
                }

                //Results DIV with ID
                var resultsDiv = jQuery("<div>", {
                    id: bathroomInfo.id,
                    class: "card pr-5 pl-5 pt-3 pb-3 mt-4 bg-white opacity-100 rounded-lg flex flex-col justify-center",
                }).appendTo("#results");

                resultsDiv.append(`<button type="button" class="button btn -mt-7 -mb-5 ml-80 w-1/4 p-2 inline-block px-6 py-2.5 bg-pink-100 text-pink-500 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-pink-500  hover:shadow-lg focus:bg-pink-100  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-pink-100  active:shadow-lg transition duration-150 ease-in-out flex items-center" >
                \xa0\xa0\xa0\xa0<i class="fa fa-heart" aria-hidden="false" style="pointer-events:none" class="justify-center"></i>\xa0\xa0Fav
                </button>
                
            `);

                resultsDiv.append(`

            <div class="bathroomDiv border-l-8 border-pink-100 pl-5 mt-3" id="${[i]}">
                <h3 class="text-2xl" style="text-transform:uppercase">${bathroomInfo.name}</h3>
                <ul id="list${[i]}">
                    <li><strong>Distance:</strong> ${distanceValue} miles from you</li>
                    <li><strong>Accessible:</strong> ${accessibleValue}</li>
                    <li><strong>Unisex:</strong> ${unisexValue}</li>
                    <li><strong>Changing Table:</strong> ${changingTableValue}</li>
                    <li><strong>Address:</strong> ${bathroomInfo.street} ${bathroomInfo.city}, ${bathroomInfo.state
                        }</li>
                <ul>
            </div>

        `);

                if (
                    bathroomInfo.directions === null ||
                    bathroomInfo.directions === ""
                ) {
                } else {
                    $(`#list${[i]}`).append(
                        `<li><strong>Directions:</strong> ${bathroomInfo.directions} </li>`
                    );
                }
                if (bathroomInfo.comment === null || bathroomInfo.comment === "") {
                } else {
                    $(`#list${[i]}`).append(`<li><strong>Comment:</strong> ${bathroomInfo.comment} </li>`);
                }
            }

            // for (var i = 0; i < data.length; i++) {
            //     var lat = JSON.parse(data[i].latitude);
            //     var lng = JSON.parse(data[i].longitude);
            //     var name = data[i].name;

            //     var bathroomMarker = new google.maps.Marker({
            //         position: {

            //             lat: bathroomInfo.lat,
            //             lng: bathroomInfo.lng,
            //         },
            //         // label: labels[labelIndex++ % labels.length],
            //         map: map,
            //         title: data[i].name
            //     });

            //     var infowindow = new google.maps.InfoWindow({
            //         content: "bathroomInfo"
            //     });

            //     google.maps.event.addListener(bathroomMarker, 'click', function () {
            //         infowindow.open(map, bathroomMarker);
            //     });

            // }
        });
    });
}

//Gets bathrooms array from local storage
function getLocalStorage() {
    //Parses value from stored bathrooms array
    var storedBathrooms = JSON.parse(localStorage.getItem("bathrooms"));

    if (storedBathrooms !== null) {
        //If the locally stored array isn't empty, update the existing array to those contents
        bathroomsArray = storedBathrooms;
        // console.log(
        //     "The locally stored bathrooms array isn't empty (value below):"
        // );
        // console.log(bathroomsArray);
    } else {
        console.log("The locally stored bathrooms array is empty.");
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
    localStorage.setItem("bathrooms", JSON.stringify(bathroomsArray));
}

//Gets current bathroom Array, called upon page load
getLocalStorage();

//Click event listener for Favorite button local storage
resultsEl.on("click", ".button", handleFavoriteButton);

//Click event listenr for storage data
searchEl.on("click", ".button", handleSearchData);
