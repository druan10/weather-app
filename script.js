var tempScale = "farenheit";
var now = new Date();
var isDayTime;
(6 <= now.getHours() <= 20) ? isDayTime = true : isDayTime = false;


$("#weatherDiv").hide();
$("#loader").hide();
$("#weatherIcon").hide();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        $("#weatherDiv").innerHTML = "<h1>Geolocation is not supported by this browser.</h1>";
    }
}

function showWeather(position) {

    $.ajax({
        url: "https://fcc-weather-api.glitch.me//api/current?",
        timeout: 1000,
        success: function (data) {

            var temp;
            (tempScale == "farenheit") ? temp = ((data.main.temp * 9) / 5) + 32 : temp = data.main.temp;
            temp = temp.toFixed(2);
            $("#weatherDiv").html(
                `
            <h1 class="text-center">Current Weather in ` + data.name + ` is</h1> 
            <h3>`+ temp + ` degrees ` + tempScale + ` - ` + data.weather[0].description.capitalize() + `.</h3>
            `
            );

            $("#weatherDiv").fadeIn();
            $("#loader").hide();

            // Check Weather Type
            switch (data.weather[0].main) {
                case "Rain":
                    $('#weatherIcon').html('<i id="weatherIcon" class="wi wi-rain"></i>');
                    break;
                case "Clouds":
                    $('#weatherIcon').html('<i id="weatherIcon" class="wi wi-cloudy"></i>');
                    break;
                case "Drizzle":
                    $('#weatherIcon').html('<i id="weatherIcon" class="wi wi-raindrops"></i>');
                    break;
                case "Snow":
                    $('#weatherIcon').html('<i id="weatherIcon" class="wi wi-snow"></i>');
                    break;
                case "Clear":
                    $('#weatherIcon').html('<i id="weatherIcon" class="wi wi-day-sunny"></i>');
                    break;
                case "Thunderstorm":
                    $('#weatherIcon').html('<i id="weatherIcon" class="wi wi-thunderstorm"></i>');
                    break;
                case "Mist":
                    $('#weatherIcon').html('<i id="weatherIcon" class="wi wi-fog"></i>');
                    break;
                default:
                    $('#weatherIcon').html('<i id="weatherIcon" class="wi wi-day-sunny"></i>');
            }

            // Choose weather icon
            $("#weatherIcon").fadeIn();
            $("#updateWeather").text('Refresh');
        },
        data: {
            lon: position.coords.longitude.toFixed(2),
            lat: position.coords.latitude.toFixed(2)
        },
        error: function (xmlhttprequest, textstatus, message) {
            if (textstatus === "timeout") {
                alert("Timed out!");
            } else {
                alert(textstatus);
            }
        }
    });
}

$("#updateWeather").click(function () {
    $("#weatherDiv").hide();
    $("#weatherIcon").hide();
    $("#loader").show();
    getLocation();
});

$('document').ready(function () {
    $('body').hide().fadeIn('slow');
    $("#weatherDiv").fadeIn();
});

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}