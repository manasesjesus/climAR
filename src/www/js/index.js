/*
 * ©2017 Manasés Jesús
 */

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

        // Initialize app
        var myApp = new Framework7();

        // If we need to use custom DOM library, let's save it to $$ variable:
        var $$ = Dom7;
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);

        if (navigator.geolocation) {
            // Get location
            navigator.geolocation.getCurrentPosition(
                function(position) {        // onSuccess
                    //receivedElement.innerText = position.coords.latitude + ", " + position.coords.longitude;
                    console.log(position.coords.latitude + ", " + position.coords.longitude);
                },
                function(error) {           // onError
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
    }
};

app.initialize();

