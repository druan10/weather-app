
var x = document.getElementById("#weatherText");
var tempScale = "farenheit";

$("#weatherDiv").children().hide();
$("#weatherDiv").children().fadeIn();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        $("#weatherDiv").innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showWeather(position) {

    $.ajax({
        url: "https://fcc-weather-api.glitch.me//api/current?",
        success: function (data) {

            $("#weatherDiv").children().hide();

            var temp;

            if (tempScale == "farenheit") {
                temp = ((data.main.temp * 9) / 5) + 32;
            } else {
                temp = data.main.temp;
            }

            $("#weatherDiv").html(
                `
                <h1 class="text-center">Current Weather in ` + data.name + ` is</h1> 
                <h3>`+ temp + ` degrees ` + tempScale + `</h3>

                `
            );
        },
        data: {
            lon: position.coords.longitude.toFixed(2),
            lat: position.coords.latitude.toFixed(2)
        }
    });
}

$("#updateWeather").click(function () {
    getLocation();
});

