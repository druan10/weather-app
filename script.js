var thisDate = new Date();
var isDayTime;
var temp;
var tempUOM = "farenheit";
var weatherLocation = "Hyrule";
var weather = "";
var weatherDescription;
var isLoading = false;

$("body").hide();
$("#weather-div").hide();
$("#loader").hide();
$("#weather-icon").hide();

function convertToFarenheit(tempinCelsius) {
    return (tempinCelsius * (9 / 5) + 32);
}

function convertToCelsius(tempinFarenheit) {
    return ((tempinFarenheit - 32) * (5 / 9));
}

function getLocation() {  // Get local Position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        $("#weather-div").innerHTML = "<h1>Geolocation is not supported by this browser.</h1>";
    }
}

function getWeather(position) { // Get local weather using local position and fcc weather api

    $.ajax({
        url: "https://fcc-weather-api.glitch.me//api/current?",
        success: function (data) {

            weatherLocation = data.name;
            weather = data.weather[0].main;
            weatherDescription = data.weather[0].description;

            (tempUOM === "farenheit") ? temp = convertToFarenheit(data.main.temp) : temp = data.main.temp;
            showWeather(weatherLocation, temp.toFixed(2), weather, weatherDescription);
            isLoading = false;
            $("#get-weather-button").prop('disabled', false);
            $("#get-weather-button").text("Refresh Weather");
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

$("#get-weather-button").click(function () {
    if (!isLoading) {
        isLoading = true;
        $("#get-weather-button").prop('disabled', true);
        $("#get-weather-button").text("loading");
        $("#weather-div").hide();
        $("#weather-icon").hide();
        $("#loader").show();
        getLocation();
    }
});

function showWeather(location, temp, weather, description) {
    $("#weather-div").html(
        `
    <h1 class="text-center">Current Weather in ` + location + ` is</h1> 
    <h3>`+ temp + ` degrees ` + tempUOM + ` - ` + description.capitalize() + `.</h3>
    `
    );
    // Check Weather Type
    switch (weather) {
        case "Rain":
            $('#weather-icon').html('<i id="weather-icon" class="wi wi-rain"></i>');
            break;
        case "Clouds":
            $('#weather-icon').html('<i id="weather-icon" class="wi wi-cloudy"></i>');
            break;
        case "Drizzle":
            $('#weather-icon').html('<i id="weather-icon" class="wi wi-raindrops"></i>');
            break;
        case "Snow":
            $('#weather-icon').html('<i id="weather-icon" class="wi wi-snow"></i>');
            break;
        case "Clear":
            $('#weather-icon').html('<i id="weather-icon" class="wi wi-day-sunny"></i>');
            break;
        case "Thunderstorm":
            $('#weather-icon').html('<i id="weather-icon" class="wi wi-thunderstorm"></i>');
            break;
        case "Mist":
            $('#weather-icon').html('<i id="weather-icon" class="wi wi-fog"></i>');
            break;
        default:
            $('#weather-icon').html('<i id="weather-icon" class="wi wi-day-sunny"></i>');
    }
    $("#weather-div").fadeIn();
    $("#loader").hide();
    $("#weather-icon").fadeIn();
    $("#get-weather-button").text('Refresh Weather');
}

$("#uom-toggle-button").click(function () {

    if (tempUOM == "farenheit") {
        (tempUOM = "celsius");
        $("#uom-toggle-button").text("Switch to Farenheit");
    } else {
        (tempUOM = "farenheit");
        $("#uom-toggle-button").text("Switch to Celsius");
    }

    if (weather) {
        (tempUOM == "farenheit") ? temp = convertToFarenheit(temp) : temp = convertToCelsius(temp);
        showWeather(weatherLocation, temp.toFixed(2), weather, weatherDescription);
    }
});

$('document').ready(function () {
    // Check if daytime
    (6 <= thisDate.getHours() <= 20) ? isDayTime = true : isDayTime = false;
    // Show page
    $('body').hide().fadeIn('slow');
    $("#weather-div").fadeIn();
});

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}