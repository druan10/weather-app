
var x = document.getElementById("#weatherText");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {

    $.ajax({
        url: "https://fcc-weather-api.glitch.me//api/current?",
        success: function(data) {
            
        },
        data : {
            lon: position.coords.longitude.toFixed(2),
            lat: position.coords.latitude.toFixed(2)
        }
      });
}

$("#updateWeather").click(function () {
    getLocation();
});