console.log("js is connected")

function init() {

    var storedBathrooms = JSON.parse(localStorage.getItem("bathrooms"));
    var favoritesEl = $("#favorites");

    if (storedBathrooms !== null) {
    for ( i = 0; i < storedBathrooms.length ; i++){
        console.log("This is the " + [i] + " element");
        favoritesEl.append(storedBathrooms[i])
        $(".bathroomDiv").attr("id", "savedBathroom" + [i])
        }
        $(".button").attr("hidden", true);
    } else {
        favoritesEl.append("You don't have any saved loos!")
    }
    }

init();