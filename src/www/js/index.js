/*
 * ©2017 Manasés Jesús
 */

var dom7 = Dom7;
var tinc = "";
var tinf = "";

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        ezar.initializeVideoOverlay(
            function() {
                ezar.getBackCamera().start();
            },
            function(error) {
                alert("Camera initialization failed");
            }
        );

        // Initialize app
        var myApp = new Framework7();

        if (navigator.geolocation) {
            // Get location
            navigator.geolocation.getCurrentPosition(
                function (position) {        // onSuccess
                    // Use reverse location for city name and country
                    nativegeocoder.reverseGeocode(
                        function (result) {
                            dom7("#location span").text(result.city + ", " + result.countryCode);
                        },
                        function (err) {
                            dom7("#location span").text("Ooops! Unknown location...");
                        },
                        position.coords.latitude, position.coords.longitude);

                    // Get weather data from Yahoo Weather API
                    $.simpleWeather({
                        location: position.coords.latitude + "," + position.coords.longitude,
                        woeid: '',
                        unit: 'c',
                        success: function (weather) {
                            tinc = '<i class="icon-' + weather.code + '"></i>' +
                                    '<div><sub>' + weather.currently + '</sub>' + weather.temp +
                                    '<sup> &deg;' + weather.units.temp + '</sup>' +

                                    '<span id="pressure_data"><sub><br>Pressure</sub>' +
                                     parseInt("" + weather.pressure) + '<sup> inHg</sup></span>' +

                                    '<span id="wind_data"><sub><br>Wind Speed</sub>' + weather.wind.speed +
                                        '<sup> ' + weather.units.speed + '</sup></span>' +

                                    '<span id="humidity_data"><sub><br>Humidity</sub>' + weather.humidity +
                                    '<sup> %</sup></span>' +

                                    '</div>';
                            dom7("#weather_details").html(tinc);
                        },
                        error: function (error) {
                            console.log("Weather error: " + error);
                        }
                    });
                    $.simpleWeather({
                        location: position.coords.latitude + "," + position.coords.longitude,
                        woeid: '',
                        unit: 'f',
                        success: function (weather) {
                            tinf = '<i class="icon-' + weather.code + '"></i>' +
                                '<div><sub>' + weather.currently + '</sub>' + weather.temp +
                                '<sup> &deg;' + weather.units.temp + '</sup>' +

                                '<span id="pressure_data"><sub><br>Pressure</sub>' +
                                parseInt("" + weather.pressure) + '<sup> mBar</sup></span>' +

                                '<span id="wind_data"><sub><br>Wind Speed</sub>' + weather.wind.speed +
                                '<sup> ' + weather.units.speed + '</sup></span>' +

                                '<span id="humidity_data"><sub><br>Humidity</sub>' + weather.humidity +
                                '<sup> %</sup></span>' +

                                '</div>';
                        },
                        error: function (error) {
                            console.log("Weather error: " + error);
                        }
                    });
                },
                function (error) {           // onError
                    console.log('code: ' + error.code + '\n' + 'message: ' + error.message);
                },
                {                           // options
                    enableHighAccuracy: true,
                    maximumAge: 3600000
                }
            );
        } else {
            alert("Geolocation is not supported on your device");
        }


        /******* Touch events *******/
        dom7("#temp").click(function () {
            dom7(this).toggleClass("fahrenheit");
            app.displayTemperature(dom7(this).hasClass("fahrenheit"));
        });

        dom7("#pressure").click(function () {
            dom7(this).toggleClass("fill");
            app.showPressure(dom7(this).hasClass("fill"));
        });

        dom7("#wind").click(function () {
            dom7(this).toggleClass("fill");
            app.showWind(dom7(this).hasClass("fill"));
        });

        dom7("#humidity").click(function () {
            dom7(this).toggleClass("fill");
            app.showHumidity(dom7(this).hasClass("fill"));
        });

        dom7("#location, #weather_details").click(function () {
            dom7("#location, #weather_details").toggleClass("black");
        });

        dom7("#rain_switch").click(function () {
            if (dom7("#rain").children().length == 0) {
                dom7("#rain").show();
                createRain(700);
            }
            else {
                dom7("#rain").html("").hide();
            }
        });

        dom7("#camera_switch").click(function () {
            dom7(this).toggleClass("selfie");
            var newCamera = ezar.getActiveCamera().getPosition() == 'BACK' ?
                                ezar.getFrontCamera() : ezar.getBackCamera();
            newCamera.start();
        });

        dom7("#camera_shutter div").touchstart(function () {
            dom7(this).addClass("pressed");
        }).touchend(function () {
            dom7(this).removeClass("pressed");
        }).click(function () {
            var elements = "#camera_shutter div, #camera_switch, #rain_switch, .speed-dial";
            dom7(elements).hide();
            setTimeout(function () {
                ezar.snapshot(
                    function () {
                        dom7(elements).show();
                    },
                    function (err) {
                        dom7(elements).show();
                    },
                    { "saveToPhotoAlbum": true }
                );
            }, 10);
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    displayTemperature: function (is_fahrenheit) {
        dom7("#temp i").addClass("spin");
        if (is_fahrenheit) {
            dom7("#weather_details").html(tinf);
        }
        else {
            dom7("#weather_details").html(tinc);
        }
        setTimeout(function () {
            dom7("#temp i").removeClass("spin");
        }, 500);
    },

    showPressure: function (show_it) {
        if (show_it) {
            dom7("#pressure i").text("money_rubl_fill");
            dom7("#pressure_data").show();
        }
        else {
            dom7("#pressure i").text("money_rubl");
            dom7("#pressure_data").hide();
        }
    },

    showWind: function (show_it) {
        if (show_it) {
            dom7("#wind_data").show();
        }
        else {
            dom7("#wind_data").hide();
        }
    },

    showHumidity: function (show_it) {
        if (show_it) {
            dom7("#humidity_data").show();
        }
        else {
            dom7("#humidity_data").hide();
        }
    }
};

app.initialize();


/******* Simple rain effect *******/
function randRange (minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

function createRain (drops) {
    for (var i=1; i<drops; i++) {
        $("#rain").append('<div class="drop" id="drop' + i + '"></div>');
        $("#drop" + i).css('left', randRange(0, 1600));
        $("#drop" + i).css('top', randRange(-1000, 1400));
    }
}
