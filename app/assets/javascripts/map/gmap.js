$(document).ready(function() {
  	if ($("div#map-canvas").length) {
      logInfo();
  		initMap();
  	}
})

var city;
var map;
var address;
var addressArr = [];
var coordinates;
var coordinatesArr = [];

function logInfo() {
	var addresses = $('div.panel-body span');
	for(i = 0; i < addresses.length; i++) {
		addressArr.push(addresses[i].id)
	}   
}



function initMap() {
    var infoBubble = new InfoBubble({
                  shadowStyle: 1,
                  padding: 1,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 0,
                  arrowSize: 10,
                  borderWidth: 1,
                  borderColor: '#FFFFFF',
                  disableAutoPan: true,
                  hideCloseButton: true,
                  arrowPosition: 50,
                  backgroundClassName: 'transparent',
                  arrowStyle: 2
                });

		city = $('div#panel-heading h2').attr("id");
		$.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + 
		city + "&key=AIzaSyAeBs3vx7LfuQg8Mj8tEqZ5WvgcwT4DElQ"
		).done(function(data) {
			if (data.results[0]) {
				var centerCoordinates = data.results[0].geometry.location;
			} 
  			var map = new google.maps.Map(document.getElementById('map-canvas'), {
    		center: centerCoordinates,
    		zoom: 12
  			});

        // ====================== Markers ==========================
        var markersCounter = 0;
        var logTitleArr = [];
        var logContentArr = []; 
        function markers(coordinates) {
          
          
           
              var logTitle = $('div.panel-body p')[markersCounter].id;
              logTitleArr.push(logTitle);
              logContentArr.push($('#' + logTitle).html());

              
              var marker = new google.maps.Marker({
                              position: new google.maps.LatLng(coordinates.lat, coordinates.lng),
                              map: map,
                              title: logTitleArr[markersCounter],
                              content: logContentArr[markersCounter]
                          });

              google.maps.event.addListener(marker, 'mouseover', function() {
                console.log(this.content);
                infoBubble.setContent((this.content).toString());
                infoBubble.open(map, this);
              });
              google.maps.event.addListener(marker, 'mouseout', function() {
                infoBubble.setContent((this.content).toString());
                infoBubble.close(map, this);
              });
              markersCounter++;
              // google.maps.event.addListener(marker,'click', (function(marker,test,infowindow){ 
              //   return function() {
              //   infowindow.setContent(test);
              //   infowindow.open(map,marker);
              //   };
              // })(marker,test,infowindow)); 
    

               
                
               //  bindInfoBubble(marker, map, infoBubble, i + 'test');
               // bindInfoWindow(marker, map, infowindow, i +'TEST');
            // }
        }

       
      var counter = 0;
      function geolocations() {       
              
                  $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + 
                  addressArr[counter] + "&key=AIzaSyAeBs3vx7LfuQg8Mj8tEqZ5WvgcwT4DElQ"
                ).done(function(data) {
                  if (data.results[0]) {
                  coordinate = data.results[0].geometry.location;
                  console.log(addressArr[counter]);
                  markers(coordinate);
                  counter++;
                  }
                  if(counter < addressArr.length) {
                    geolocations();
        
                  }
                })

      }
          geolocations();

  		})
    

}


