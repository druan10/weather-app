var tempScale = "farenheit";
var now = new Date();

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
        success: function (data) {

            var temp;
            (tempScale == "farenheit") ? temp = ((data.main.temp * 9) / 5) + 32 : temp = data.main.temp;
            temp = temp.toFixed(2);
            $("#weatherDiv").html(
                `
            <h1 class="text-center">Current Weather in ` + data.name + ` is</h1> 
            <h3>`+ temp + ` degrees ` + tempScale + `</h3>
            `
            );

            $("#weatherDiv").fadeIn();
            $("#loader").hide();

            $("#weatherIcon").fadeIn();
            $("#updateWeather").text('Refresh');
        },
        data: {
            lon: position.coords.longitude.toFixed(2),
            lat: position.coords.latitude.toFixed(2)
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

