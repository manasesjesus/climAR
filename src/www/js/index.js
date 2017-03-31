/*
 * ©2017 Manasés Jesús
 */

var $$ = Dom7;

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
        ); */

        if (navigator.geolocation) {
            // Get location
            navigator.geolocation.getCurrentPosition(
                function (position) {        // onSuccess
                    $$("#location span").text(position.coords.latitude + ", " + position.coords.longitude);
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
        $$("#temp").click(function () {
            $$(this).toggleClass("fahrenheit");
            app.calculateTemperature($$(this).hasClass("fahrenheit"));
        });

        $$("#pressure").click(function () {
            $$(this).toggleClass("fill");
            app.showPressure($$(this).hasClass("fill"));
        });

        $$("#wind").click(function () {
            $$(this).toggleClass("fill");
            app.showWind($$(this).hasClass("fill"));
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // Initialize app
        var myApp = new Framework7();

        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    },

    calculateTemperature: function (is_fahrenheit) {
        if (is_fahrenheit) {
            $$("#temp i").text("ºF");
        }
        else {
            $$("#temp i").text("ºC");
        }
    },

    showPressure: function (show_it) {
        if (show_it) {
            $$("#pressure i").text("sort_fill");
        }
        else {
            $$("#pressure i").text("sort");
        }
    },

    showWind: function (show_it) {
        if (show_it) {
            $$("#wind i").text("login_fill");
        }
        else {
            $$("#wind i").text("login");
        }
    }
};

app.initialize();

