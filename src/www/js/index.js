/*
 * ©2017 Manasés Jesús
 */

var dom7 = Dom7;

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

        /*ezar.initializeVideoOverlay(
            function() {
                ezar.getBackCamera().start();
            },
            function(error) {
                alert("Camera initialization failed");
            }
        );*/

        // Initialize app
        var myApp = new Framework7();

        if (navigator.geolocation) {
            // Get location
            navigator.geolocation.getCurrentPosition(
                function (position) {        // onSuccess
                    nativegeocoder.reverseGeocode(
                        function (result) {
                            dom7("#location span").text(result.city + ", " + result.countryCode);
                        },
                        function (err) {
                            dom7("#location span").text("Ooops! Can't get the location...");
                        },
                        position.coords.latitude, position.coords.longitude);
                },
                function (error) {           // onError
                    console.log('code: '    + error.code    + '\n' + 'message: ' + error.message);
                },
                {                           // options
                    enableHighAccuracy: true,
                    maximumAge: 3600000
                }
            );
        } else {
            alert("Geolocation is not supported on your device");
        }

        /******* Bind touch events *******/
        dom7("#temp").click(function () {
            dom7(this).toggleClass("fahrenheit");
            app.calculateTemperature(dom7(this).hasClass("fahrenheit"));
        });

        dom7("#pressure").click(function () {
            dom7(this).toggleClass("fill");
            app.showPressure(dom7(this).hasClass("fill"));
        });

        dom7("#wind").click(function () {
            dom7(this).toggleClass("fill");
            app.showWind(dom7(this).hasClass("fill"));
        });

        dom7("#location").click(function () {
            dom7("#location").toggleClass("black");
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {


        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    },

    calculateTemperature: function (is_fahrenheit) {
        if (is_fahrenheit) {
            dom7("#temp i").html("&deg;F");
        }
        else {
            dom7("#temp i").html("&deg;C");
        }
    },

    showPressure: function (show_it) {
        if (show_it) {
            dom7("#pressure i").text("money_rubl_fill");
        }
        else {
            dom7("#pressure i").text("money_rubl");
        }
    },

    showWind: function (show_it) {
        if (show_it) {
            dom7("#wind i").text("login_fill");
        }
        else {
            dom7("#wind i").text("login");
        }
    }
};

app.initialize();

