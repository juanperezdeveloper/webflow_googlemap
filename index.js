<!-- Load Google Places API -->
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAyaRroGXXw-zWic_BrM7JPLzyTM2cc0V0&libraries=places,geometry"></script>

<!-- Set autocomplete input -->
<script>
  	// autocomplete form in create page
    function initialize() {
      let gpaInput0 = document.getElementById("Location");
  	  let autocompleteLocation = new google.maps.places.Autocomplete(gpaInput0);
      let gpaInput1 = document.getElementById("Place-1");
      let gpaInput2 = document.getElementById("Place-2");
      let gpaInput3 = document.getElementById("Place-3");
      let gpaInput4 = document.getElementById("Place-4");
      let gpaInput5 = document.getElementById("Place-5");
      let autocomplete1 = new google.maps.places.Autocomplete(gpaInput1);
      let autocomplete2 = new google.maps.places.Autocomplete(gpaInput2);
      let autocomplete3 = new google.maps.places.Autocomplete(gpaInput3);
      let autocomplete4 = new google.maps.places.Autocomplete(gpaInput4);
      let autocomplete5 = new google.maps.places.Autocomplete(gpaInput5);
      google.maps.event.addListener(autocomplete1, 'place_changed', function() {
        let place = autocomplete1.getPlace();
        if (place.place_id) {
        	document.getElementById("Place-1-link").value = "https://www.google.com/maps/place/?q=place_id:" + place.place_id;
        }
      });
      google.maps.event.addListener(autocomplete2, 'place_changed', function() {
        let place = autocomplete2.getPlace();
        if (place.place_id) {
        	document.getElementById("Place-2-link").value = "https://www.google.com/maps/place/?q=place_id:" + place.place_id;
        }
      });
      google.maps.event.addListener(autocomplete3, 'place_changed', function() {
        let place = autocomplete3.getPlace();
        if (place.place_id) {
        	document.getElementById("Place-3-link").value = "https://www.google.com/maps/place/?q=place_id:" + place.place_id;
        }
      });
      google.maps.event.addListener(autocomplete4, 'place_changed', function() {
        let place = autocomplete4.getPlace();
        if (place.place_id) {
        	document.getElementById("Place-4-link").value = "https://www.google.com/maps/place/?q=place_id:" + place.place_id;
        }
      });
      google.maps.event.addListener(autocomplete5, 'place_changed', function() {
        let place = autocomplete5.getPlace();
        if (place.place_id) {
        	document.getElementById("Place-5-link").value = "https://www.google.com/maps/place/?q=place_id:" + place.place_id;
        }
      });
    }
    google.maps.event.addDomListener(window, "load", initialize);
    // show 5 locations in a map
    $(document).ready(function() {
      let locations = [];
      let geocoder;
      let map;
      let bounds = new google.maps.LatLngBounds();
	    let mapSections = $('.map-section');
      let delayFactor = 0;
      let idx = [];
      let currentIndex = -1;
      function initializeLoadMap(n=0) {
        map = new google.maps.Map(mapSections[n], {
          center: new google.maps.LatLng(37.4419, -122.1419),
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        geocoder = new google.maps.Geocoder();
		    for (let i = 0; i < locations.length; i ++) {
          geocodeAddress(locations[i]);
        }
      }

      function geocodeAddress(location) {
        let address = location[0];
        let url = location[1];
        geocoder.geocode({
          'address': location[0]
        },

	  	  function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            let marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              address: address,
              url: url
            })
            bounds.extend(marker.getPosition());
            map.fitBounds(bounds);
            queryResult = 'ok';
          } else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
            // avoid over_query_limit error
            delayFactor++;
            setTimeout(function () {
                geocodeAddress(location);
                queryResult = 'error';
            }, delayFactor * 1000);
          } else {
            console.log("geocode of " + address + " failed:" + status);
          }
        });
      }

      $('.title').on('click', function(e) {
        let index = $('.title').index(this);
        let currentDetail = $(this).parent();
        let detail = currentDetail.children('.top5ive-detail');
        if (currentIndex == index) {
          $('.top5ive-detail').hide();
          currentIndex = -1;
        } else {
          $('.top5ive-detail').hide();
          detail.show();
          currentIndex = index;
        }
        if (!idx.includes(index)) {
          idx.push(index);
          locations = [];
          bounds = new google.maps.LatLngBounds();
          let mapSection = detail.children().eq(0);
          for (let i = 0; i < 5; i ++) {
            let url = detail.children().eq(i + 2).attr('href');
            let address = detail.children().eq(i + 2).children().eq(1).html();
            locations.push([address, url]);
          }
          initializeLoadMap(index);
        }
      })
      google.maps.event.addDomListener(window, "load", initializeLoadMap);
    })
</script>