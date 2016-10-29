var status, map, marker, oldPosition, latlng;

function updateLocation(lat, lng, accuracy) {
  oldPosition = latlng;
  latlng = new google.maps.LatLng(lat, lng);

  marker.setPosition(latlng);
  map.panTo(latlng);
  map.setCenter(latlng);

  if(accuracy % 1 != 0) {
    accuracy = accuracy.toFixed(1);
  }

  document.getElementById('accuracy').innerHTML = accuracy ? accuracy+'m' : 'n/a';
  document.getElementById('location').innerHTML = lat+', '+lng;
}

function success(position) {
  updateLocation(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
}

function error(msg) {
  alert(typeof msg == 'string' ? msg : "failed");
  // console.log(arguments);
}

var mapInit = function () {
  if (navigator.geolocation) {
    map = new google.maps.Map(document.getElementById('mapcanvas'), {
      zoom: 18,
      mapTypeControl: false,
      streetViewControl: false,
      navigationControlOptions: {style: google.maps.NavigationControlStyle.LARGE},
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    marker = new google.maps.Marker({
        map: map,
        title: 'Current position',
        draggable: true,
        animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'dragend', function() {
      var position = marker.getPosition();
      updateLocation(position.lat(), position.lng(), 0);
    });

    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    error('not supported');
  }
}

document.getElementById('find_me').onclick = function() {
  navigator.geolocation.getCurrentPosition(success, error);
  return false;
};

document.getElementById('add_marker').onclick = function() {
  new google.maps.Marker({
      position: latlng,
      map: map,
      title: new Date().toLocaleString(),
      icon: 'http://labs.google.com/ridefinder/images/mm_20_gray.png'
  });
  return false;
};
