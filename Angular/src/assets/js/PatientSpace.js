
var infowindow;
var map, infoWindow;
function initMap() {

    google.maps.event.addDomListener(window, 'load', initialize);


    var pos;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 35.6759137, lng: 10.0919243 }
    });
    directionsDisplay.setMap(map);

    /////////////////


    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: 36.8991378,
                lng: 10.1895082
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }



    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }



    /////////////////////// 

    // the trick of 500 d'ont forget 

    setTimeout(function () {

        var x1 = pos.lat;
        var x2 = pos.lng;
        var y1 = document.getElementById('l2').value;
        var y2 = document.getElementById('la2').value;

        console.log(pos.lng + "////" + pos.lat);

        calculateAndDisplayRoute(directionsService, directionsDisplay, x1, x2, y1, y2);
    }, 500);










    function calculateAndDisplayRoute(directionsService, directionsDisplay, v1, v2, d1, d2) {
        // to get by driving
        var selectedMode = document.getElementById('mode').value;

        // v1 v2 origin and d1 d2 destination 

        directionsService.route({
            origin: { lat: parseFloat(v1), lng: parseFloat(v2) },  // Haight.
            destination: { lat: parseFloat(d1), lng: parseFloat(d2) },  // Ocean Beach.
            travelMode: google.maps.TravelMode[selectedMode]
        }, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                computeTotalDistance(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });



    }


    function createMarker(place) {
        var placeLoc = place.geometry.location;


        var marker = new google.maps.Marker({
            Map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name); // it's for the name of the place when you click in the marker 
            infowindow.open(map, this); // open the marker
        });
    }






    function initialize() {

        var autocomplete = new google.maps.places.Autocomplete(document.getElementById('depart'));

    }


    function computeTotalDistance(result) {
        var total = 0;
        var myroute = result.routes[0];
        for (i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i].distance.value;
        }
        total = total / 1000.
        document.getElementById('total').value = total;
    }

}
