console.log("js is connected")

function init() {

    var storedBathrooms = JSON.parse(localStorage.getItem("bathrooms"));
    var favoritesEl = $("#favorites");

    for ( i = 0; i < storedBathrooms.length ; i++){
        console.log("This is the " + [i] + " element");

        favoritesEl.append(storedBathrooms[i])
        $(".bathroomDiv").attr("id", "savedBathroom" + [i])
    }

    $(".button").attr("hidden", true);

}

init();