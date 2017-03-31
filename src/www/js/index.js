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

        var location = ""

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
    }
};

app.initialize();

