$(document).ready(function() {
	initializePage();

});


/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	mapboxgl.accessToken = 'pk.eyJ1IjoiaGFpamFuIiwiYSI6ImNqaHJiaGZwYzBpemYzZGtrOWI2cHlnN2EifQ.tau7UlEgZS0EN_7JdcKt7g';

	const map = new mapboxgl.Map({
	    container: 'map', // container id
	    style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
	    center: [-117.248512, 32.875605,], // starting position [lng, lat]
	    zoom: 12 // starting zoom
	});

	let select= document.getElementById("view");
	let selectedLocation = select.options[select.selectedIndex].value;
	console.log(selectedLocation);

	$('#view').change( function() {

		let select= document.getElementById("view");
		let selectedLocation = select.options[select.selectedIndex].value;
		console.log(selectedLocation);

		let target = '';


		if (selectedLocation == "San Diego") {
			target = [-117.248512, 32.875605];
		} else if (selectedLocation == "San Francisco") {
			target = [-122.416305, 37.792877];
		} else {
			target = [-121.931945, 37.698069];
		}



		map.flyTo({
	        // These options control the ending camera position: centered at
	        // the target, at zoom level 9, and north up.
	        center: target,
	        zoom: 12,
	        bearing: 0,

	        // These options control the flight curve, making it move
	        // slowly and zoom out almost completely before starting
	        // to pan.
	        speed: 2, // make the flying slow
	        curve: 1, // change the speed at which it zooms out

	        // This can be any easing function: it takes a number between
	        // 0 and 1 and returns another number between 0 and 1.
	        easing: function (t) {
	            return t;
	        }
    	});

	});




	/******** 
	 *
	 *	THIS IS FOR LOADING HOVERS 
	 *	
	*********/

	map.on('load', function() {
		// Add a layer showing the places.
	    map.addLayer({
	        "id": "places",
	        "type": "symbol",
	        "source": {
	            "type": "geojson",
	            "data": {
	                "type": "FeatureCollection",
	                "features": [
	                /* Geojson problems https://www.mapbox.com/maki-icons/*/

	                /* Problem 1 */
	                {
	                    "type": "Feature",
	                    "properties": {
	                        "description": "<strong>Waiting for Food</strong><p>Improving transparency during the restaurant experience</p>",
	                        "icon": "star"
	                    },
	                    "geometry": {
	                        "type": "Point",
	                        "coordinates": [-117.254183, 32.864598]
	                    }
	                }, 
	                /* Problem 2 */
	                {
	                    "type": "Feature",
	                    "properties": {
	                        "description": "<strong>Problem 2</strong><p>Description</p>",
	                        "icon": "star"
	                    },
	                    "geometry": {
	                        "type": "Point",
	                        "coordinates": [-117.241889, 32.888556]
	                    }
	                },

	                /* TEMPLATE
	                {
	                    "type": "Feature",
	                    "properties": {
	                        "description": "<strong>Problem 2</strong><p>Description</p>",
	                        "icon": "star"
	                    },
	                    "geometry": {
	                        "type": "Point",
	                        "coordinates": [-117.241889, 32.888556]
	                    }
	                },
	                */ 


	                /* Geojson places */

	                /* Place 1 */
	                {
	                    "type": "Feature",
	                    "properties": {
	                        "description": "<strong>Place 1</strong><p>Description</p>",
	                        "icon": "attraction"
	                    },
	                    "geometry": {
	                        "type": "Point",
	                        "coordinates": [-117.146275, 32.915077]
	                    }
	                }, 
	                /* Place 2 */
	                {
	                    "type": "Feature",
	                    "properties": {
	                        "description": "<strong>Place 2</strong><p>Description</p>",
	                        "icon": "attraction"
	                    },
	                    "geometry": {
	                        "type": "Point",
	                        "coordinates": [-117.243451, 32.885747]
	                    }
	                },
	                /* Place 3 */


	                /* Geojson stories */

	                /* Story 1 */
	                {
	                    "type": "Feature",
	                    "properties": {
	                        "description": "<strong>Story 1</strong><p>Description</p>",
	                        "icon": "cafe"
	                    },
	                    "geometry": {
	                        "type": "Point",
	                        "coordinates": [-117.251933, 32.888090]
	                    }
	                }, 
	                /* Story 2 */
	                {
	                    "type": "Feature",
	                    "properties": {
	                        "description": "<strong>Story 2</strong><p>Description</p>",
	                        "icon": "cafe"
	                    },
	                    "geometry": {
	                        "type": "Point",
	                        "coordinates": [-117.241068, 32.874468]
	                    }
	                },
	                /* Place 3 */
	                ]
	            }
	        },
	        "layout": {
	            "icon-image": "{icon}-15",
	            "icon-allow-overlap": true
	        }
	    });

		// Create a popup, but don't add it to the map yet.
	    var popup = new mapboxgl.Popup({
	        closeButton: false,
	        closeOnClick: false
	    });

	    map.on('mouseenter', 'places', function(e) {
	        // Change the cursor style as a UI indicator.
	        map.getCanvas().style.cursor = 'pointer';

	        var coordinates = e.features[0].geometry.coordinates.slice();
	        var description = e.features[0].properties.description;

	        // Ensure that if the map is zoomed out such that multiple
	        // copies of the feature are visible, the popup appears
	        // over the copy being pointed to.
	        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
	            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
	        }

	        // Populate the popup and set its coordinates
	        // based on the feature found.
	        popup.setLngLat(coordinates)
	            .setHTML(description)
	            .addTo(map);
	    });

	    map.on('mouseleave', 'places', function() {
	        map.getCanvas().style.cursor = '';
	        popup.remove();
	    });

	});







	/******** 
	 *
	 *	PROBLEMS
	 *	
	*********/

	const geojsonProblems = {
	    "type": "FeatureCollection",
	    "features": [

	    	/* Problem 1 */
	        {
	            "type": "Feature",
	            "properties": {
	                "iconSize": [50, 50]
	            },
	            "geometry": {
	                "type": "Point",
	                "image": 'url(images/100Days/problems/problem1.2.jpg)',
	            	"modal": '<div class="modal-media"> <img class="mySlides" src="images/100days/problems/problem1.1.JPG"><img class="mySlides" src="images/100days/problems/problem1.2.JPG"> <img class="mySlides" src="images/100days/problems/problem1.3.JPG"><img class="mySlides" src="images/100days/problems/problem1.4.JPG"><button class="w3-button w3-display-left">&#10094;</button> <button class="w3-button w3-display-right">&#10095;</button> </div> <div class="modal-info-container"> <h1 class="modalTitle">Improving the line and restaurant experience</h1> <p class="modalDescription">Waiting in line and for your food can be torturous at times. </p> <p class="modalDescription">In very busy and popular restaurants, this can create a negative experience for many customers. Imagine standing in line for 30+ minutes to order and then another 30+ minutes to get your food. Customers would often have ask the staff how much longer until they receive their food and this often result to false estimates or even worse - missed meals.</p> <p class="modalDescription">How can we improve transparency during the restaurant experience?</p> </div>',
	                "coordinates": [
	                    -117.254183, 
	                    32.864598
	                ]
	            }
	        },

	        /* Problem 2 */
	        {
	            "type": "Feature",
	            "properties": {
	                "iconSize": [50, 50]
	            },
	            "geometry": {
	                "type": "Point",
	            	"modal": '<div class="modal-media"> <img class="mySlides" src="images/librarysign/Sign1.png"> <img class="mySlides" src="images/librarysign/Sign2.png"> <img class="mySlides" src="images/librarysign/Sign3.png"> <button class="w3-button w3-display-left">&#10094;</button> <button class="w3-button w3-display-right">&#10095;</button> </div> <div class="modal-info-container"> <h1 class="modalTitle">Title</h1> <p class="modalDescription">Description</p> </div>',
	                "coordinates": [
	                    -117.241889,
	                    32.888556
	                ]
	            }
	        },
	    ]
	};

	let counter = 0;
	// add markers to map
	geojsonProblems.features.forEach(function(marker) {
	    // create a DOM element for the marker
	    let picMarker = document.createElement('div');
	    picMarker.className = 'marker';
	    picMarker.id = 'marker' + counter;
	    picMarker.style.backgroundImage =  marker.geometry.image;
	    console.log(marker.geometry.image);
	    picMarker.style.width = marker.properties.iconSize[0] + 'px';
	    picMarker.style.height = marker.properties.iconSize[1] + 'px';

	    //create a mini circle to the right of div
	   

	    /* ON CLICK WILL DISPLAY MODAL */
	    let modal = document.getElementById('myModal');
	    let modalContent = document.getElementsByClassName('content-container');

	    //span that will close the modal
	    let closeSpan = document.getElementsByClassName("close")[0];

	    picMarker.addEventListener('click', function() {
	    	$('.content-container').html('');
	    	$('.content-container').append(marker.geometry.modal);
	    	//will show the modal
	    	modal.style.display = "block";

			var slideIndex = 1;
			showDivs(slideIndex);

			function plusDivs(n) {
			    showDivs(slideIndex += n);
			}

			$('.w3-display-right').click(function() {
				plusDivs(+1);
			});

			$('.w3-display-left').click(function() {
				plusDivs(-1);
			});


			function showDivs(n) {
			    var i;
			    var x = document.getElementsByClassName("mySlides");
			    if (n > x.length) {slideIndex = 1} 
			    if (n < 1) {slideIndex = x.length} ;
			    for (i = 0; i < x.length; i++) {
			        x[i].style.display = "none"; 
			    }
			    x[slideIndex-1].style.display = "block"; 
			}
	    });

	    // When the user clicks on <span> (x), close the modal
		closeSpan.onclick = function() {
		    modal.style.display = "none";
		}

		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}



	    // add marker to map
	    new mapboxgl.Marker(picMarker)
	        .setLngLat(marker.geometry.coordinates)
	        .addTo(map);

	     counter = counter + 1;
	});

	let i = 0;
	for (i = 0; i < counter; i++) {
		let markerRef = '#marker' + i;
	    console.log(markerRef);
	    $(markerRef).append('<div class="miniNum">' + i + '</div>');
	}








	/******** 
	 *
	 *	PLACES
	 *	
	*********/

	/* FOR PLACES */
	const geojsonPlaces = {
	    "type": "FeatureCollection",
	    "features": [
	    	/* Place 1 */
	        {
	            "type": "Feature",
	            "properties": {
	                "iconSize": [40, 40]
	            },
	            "geometry": {
	                "type": "Point",
	                "image": 'url(images/100Days/places/place1.1.jpg)',
	            	"modal": '<div class="modal-media"> <img class="mySlides" src="images/100days/places/place1.1.JPG"> <img class="mySlides" src="images/100days/places/place1.2.JPG"> <button class="w3-button w3-display-left">&#10094;</button> <button class="w3-button w3-display-right">&#10095;</button> </div> <div class="modal-info-container"> <h1 class="modalTitle">Ding Tea</h1> <p class="modalDescription">Ordered a Thai Iced Tea w/ Boba. The place has a really nice, modern vibe. The walls are covered with plant decorations and boba decals. Definitely would love to study here.</p> <p class="modalDescription">Boba Rating: 4/5</p> </div>',
	                "coordinates": [-117.146275, 32.915077]
	            }

	            
	        },
	        /* Place 2 */
	        {
	            "type": "Feature",
	            "properties": {
	                "message": "Bar",
	                "iconSize": [40, 40]
	            },
	            "geometry": {
	            	"type": "Point",
	            	"modal": '<div class="modal-media"> <img class="mySlides" src="images/librarysign/Sign1.png"> <img class="mySlides" src="images/librarysign/Sign2.png"> <img class="mySlides" src="images/librarysign/Sign3.png"> <button class="w3-button w3-display-left">&#10094;</button> <button class="w3-button w3-display-right">&#10095;</button> </div> <div class="modal-info-container"> <h1 class="modalTitle">Title</h1> <p class="modalDescription">Description</p> </div>',
	                "coordinates": [
	                    -117.243451,
	                    32.885747
	                ]
	            }
	        },
	        /* Place 3 */
	    ]
	};

	let counterPlace = 0;
	geojsonPlaces.features.forEach(function(marker) {
	    // create a DOM element for the marker
	    let picMarker = document.createElement('div');
	    picMarker.className = 'markerPlace';
	    picMarker.id = 'markerPlace' + counterPlace;
	    picMarker.style.backgroundImage = marker.geometry.image;
	    picMarker.style.width = marker.properties.iconSize[0] + 'px';
	    picMarker.style.height = marker.properties.iconSize[1] + 'px';

	    //create a mini circle to the right of div
	   

	   	/* ON CLICK WILL DISPLAY MODAL */
	    let modal = document.getElementById('myModal');
	    let modalContent = document.getElementsByClassName('content-container');

	    //span that will close the modal
	    let closeSpan = document.getElementsByClassName("close")[0];

	    picMarker.addEventListener('click', function() {
	    	$('.content-container').html('');
	    	$('.content-container').append(marker.geometry.modal);
	    	//will show the modal
	    	modal.style.display = "block";

			var slideIndex = 1;
			showDivs(slideIndex);

			function plusDivs(n) {
			    showDivs(slideIndex += n);
			}

			$('.w3-display-right').click(function() {
				plusDivs(+1);
			});

			$('.w3-display-left').click(function() {
				plusDivs(-1);
			});


			function showDivs(n) {
			    var i;
			    var x = document.getElementsByClassName("mySlides");
			    if (n > x.length) {slideIndex = 1} 
			    if (n < 1) {slideIndex = x.length} ;
			    for (i = 0; i < x.length; i++) {
			        x[i].style.display = "none"; 
			    }
			    x[slideIndex-1].style.display = "block"; 
			}
	    });

	    // When the user clicks on <span> (x), close the modal
		closeSpan.onclick = function() {
			console.log('closed');
		    modal.style.display = "none";
		}

		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}


	    // add marker to map
	    new mapboxgl.Marker(picMarker)
	        .setLngLat(marker.geometry.coordinates)
	        .addTo(map);

	     counterPlace = counterPlace + 1;
	});

	let p = 0;
	for (p = 0; p < counterPlace; p++) {
		let markerRef = '#markerPlace' + p;
	    console.log(markerRef);
	    $(markerRef).append('<div class="miniNumPlace">' + p + '</div>');
	}





	/******** 
	 *
	 *	Stories
	 *	
	*********/

	/* FOR Stories */
	const geojsonStories = {
	    "type": "FeatureCollection",
	    "features": [
	    	/* Story 1 */
	        {
	            "type": "Feature",
	            "properties": {
	                "iconSize": [40, 40]
	            },
	            "geometry": {
	                "type": "Point",
	            	"modal": '<div class="modal-media"> <img class="mySlides" src="images/librarysign/Sign1.png"> <img class="mySlides" src="images/librarysign/Sign2.png"> <img class="mySlides" src="images/librarysign/Sign3.png"> <button class="w3-button w3-display-left">&#10094;</button> <button class="w3-button w3-display-right">&#10095;</button> </div> <div class="modal-info-container"> <h1 class="modalTitle">Title</h1> <p class="modalDescription">Description</p> </div>',
	                "coordinates": [
	                    -117.251933,
	                    32.888090
	                ] 
	            }
	        },
	        /* Story 2 */
	        {
	            "type": "Feature",
	            "properties": {
	                "message": "Bar",
	                "iconSize": [40, 40]
	            },
	            "geometry": {
	            	"type": "Point",
	            	"modal": '<div class="modal-media"> <img class="mySlides" src="images/librarysign/Sign1.png"> <img class="mySlides" src="images/librarysign/Sign2.png"> <img class="mySlides" src="images/librarysign/Sign3.png"> <button class="w3-button w3-display-left">&#10094;</button> <button class="w3-button w3-display-right">&#10095;</button> </div> <div class="modal-info-container"> <h1 class="modalTitle">Title</h1> <p class="modalDescription">Description</p> </div>',
	                "coordinates": [
	                    -117.241068,
	                    32.874468
	                ]
	            }
	        },
	        /* Story 3 */
	    ]
	};

	let counterStory = 0;
	geojsonStories.features.forEach(function(marker) {
	    // create a DOM element for the marker
	    let picMarker = document.createElement('div');
	    picMarker.className = 'markerStory';
	    picMarker.id = 'markerStory' + counterStory;
	    picMarker.style.backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8be5_W19GGNd3PQYbQ8ACF-g2aj22_wEHx8Crh0Y7LbGOaaoWFA)';
	    picMarker.style.width = marker.properties.iconSize[0] + 'px';
	    picMarker.style.height = marker.properties.iconSize[1] + 'px';

	    //create a mini circle to the right of div
	   

	   	/* ON CLICK WILL DISPLAY MODAL */
	    let modal = document.getElementById('myModal');
	    let modalContent = document.getElementsByClassName('content-container');

	    //span that will close the modal
	    let closeSpan = document.getElementsByClassName("close")[0];

	    picMarker.addEventListener('click', function() {
	    	$('.content-container').html('');
	    	$('.content-container').append(marker.geometry.modal);
	    	//will show the modal
	    	modal.style.display = "block";

			var slideIndex = 1;
			showDivs(slideIndex);

			function plusDivs(n) {
			    showDivs(slideIndex += n);
			}

			$('.w3-display-right').click(function() {
				plusDivs(+1);
			});

			$('.w3-display-left').click(function() {
				plusDivs(-1);
			});


			function showDivs(n) {
			    var i;
			    var x = document.getElementsByClassName("mySlides");
			    if (n > x.length) {slideIndex = 1} 
			    if (n < 1) {slideIndex = x.length} ;
			    for (i = 0; i < x.length; i++) {
			        x[i].style.display = "none"; 
			    }
			    x[slideIndex-1].style.display = "block"; 
			}
	    });

	    // When the user clicks on <span> (x), close the modal
		closeSpan.onclick = function() {
			console.log('closed');
		    modal.style.display = "none";
		}

		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}


	    // add marker to map
	    new mapboxgl.Marker(picMarker)
	        .setLngLat(marker.geometry.coordinates)
	        .addTo(map);

	     counterStory = counterStory + 1;
	});

	/* For story counter
	let s = 0;
	for (s = 0; s < counterStory; s++) {
		let markerRef = '#markerStory' + s;
	    console.log(markerRef);
	    $(markerRef).append('<div class="miniNumStory">' + s + '</div>');
	}
	*/







	/******** 
	 *
	 *	TOGGLE CONTROLS
	 *	
	*********/

	window.onload = function () {

		/* This returns an collection of all elements in the document with the specificied
		class name, as an array object, need to use a loop to select individual one */
		const markerRef = document.getElementsByClassName("marker");
		const markerRefPlace = document.getElementsByClassName("markerPlace");
		const markerRefStory  = document.getElementsByClassName("markerStory");


		//on click, display all markers
		$('#allToggle').click(function () {
			//console.log(markerRef);

			//show all of the marker problems
			for (const e of markerRef) {
				onMapProblems = true;
				e.style.display = "block";
			}

			//show all of the marker places
			for (const e of markerRefPlace) {
				onMapPlaces = true;
				e.style.display = "block";
			}
			
			//show all of the marker stories
			for (const e of markerRefStory) {
				onMapStories = true;
				e.style.display = "block";
			}

			//problems toggle when selected
			$('#problemsToggle').css("background-color","white");
			$('#problemsToggle').css("color","#FF5E55");

			//places toggle return to normal
			$('#placesToggle').css("background-color","white");
			$('#placesToggle').css("color","#FF5E55");

			//places toggle return to normal
			$('#storiesToggle').css("background-color","white");
			$('#storiesToggle').css("color","#FF5E55");


			//all toggle when selected
			$('#allToggle').css("background-color","#FF5E55");
			$('#allToggle').css("color","white");
		});

		//Booleans to tell whether or not buttons have been toggled
		let onMapProblems =  true;
		let onMapPlaces =  true;
		let onMapStories =  true;

		//on click, just show problem markers
		$('#problemsToggle').click(function () {
			//console.log(markerRef);
			if (onMapPlaces || onMapStories) {
				onMapProblems = true;
				onMapPlaces = false;
				onMapStories = false;
				for (const e of markerRef) {
					console.log(e);
					e.style.display = "block";
				}
				for (const e of markerRefPlace) {
					console.log(e);
					e.style.display = "none";
				}
				for (const e of markerRefStory) {
					console.log(e);
					e.style.display = "none";
				}
				//problems toggle when selected
				$('#problemsToggle').css("background-color","#FF5E55");
				$('#problemsToggle').css("color","white");

				//places toggle return to normal
				$('#placesToggle').css("background-color","white");
				$('#placesToggle').css("color","#FF5E55");

				//places toggle return to normal
				$('#storiesToggle').css("background-color","white");
				$('#storiesToggle').css("color","#FF5E55");

				//all toggle when selected
				$('#allToggle').css("background-color","white");
				$('#allToggle').css("color","#FF5E55");
			} else {
				onMapProblems = true;
				onMapPlaces = true;
				onMapStories = true;
				for (const e of markerRef) {
					console.log(e);
					e.style.display = "block";
				}
				for (const e of markerRefPlace) {
					console.log(e);
					e.style.display = "block";
				}
				for (const e of markerRefStory) {
					console.log(e);
					e.style.display = "block";
				}
				//problems toggle when selected
				$('#problemsToggle').css("background-color","white");
				$('#problemsToggle').css("color","#FF5E55");

				//places toggle return to normal
				$('#placesToggle').css("background-color","white");
				$('#placesToggle').css("color","#FF5E55");

				//places toggle return to normal
				$('#storiesToggle').css("background-color","white");
				$('#storiesToggle').css("color","#FF5E55");
			}
			//console.log(onMap);
		});



		//on click, just show places marker
		$('#placesToggle').click(function () {
			//console.log(markerRefPlace);

			if (onMapProblems || onMapStories) {
				onMapProblems = false;
				onMapPlaces = true;
				onMapStories = false;
				for (const e of markerRef) {
					console.log(e);
					e.style.display = "none";
				}
				for (const e of markerRefPlace) {
					console.log(e);
					e.style.display = "block";
				}
				for (const e of markerRefStory) {
					console.log(e);
					e.style.display = "none";
				}
				//problems toggle when selected
				$('#problemsToggle').css("background-color","white");
				$('#problemsToggle').css("color","#FF5E55");

				//places toggle return to normal
				$('#placesToggle').css("background-color","#FF5E55");
				$('#placesToggle').css("color","white");

				//places toggle return to normal
				$('#storiesToggle').css("background-color","white");
				$('#storiesToggle').css("color","#FF5E55");

				//all toggle when selected
				$('#allToggle').css("background-color","white");
				$('#allToggle').css("color","#FF5E55");
			} else {
				onMapProblems = true;
				onMapPlaces = true;
				onMapStories = true;
				for (const e of markerRef) {
					console.log(e);
					e.style.display = "block";
				}
				for (const e of markerRefPlace) {
					console.log(e);
					e.style.display = "block";
				}
				for (const e of markerRefStory) {
					console.log(e);
					e.style.display = "block";
				}
				//problems toggle when selected
				$('#problemsToggle').css("background-color","white");
				$('#problemsToggle').css("color","#FF5E55");

				//places toggle return to normal
				$('#placesToggle').css("background-color","white");
				$('#placesToggle').css("color","#FF5E55");

				//places toggle return to normal
				$('#storiesToggle').css("background-color","white");
				$('#storiesToggle').css("color","#FF5E55");
			}

		});



		//on click, just show the story markers
		$('#storiesToggle').click(function () {
			//console.log(markerRefPlace);

			if (onMapPlaces || onMapProblems) {
				onMapPlaces = false;
				onMapProblem = false;
				onMapStories = true;
				for (const e of markerRef) {
					console.log(e);
					e.style.display = "none";
				}
				for (const e of markerRefPlace) {
					console.log(e);
					e.style.display = "none";
				}
				for (const e of markerRefStory) {
					console.log(e);
					e.style.display = "block";
				}
				//problems toggle when selected
				$('#problemsToggle').css("background-color","white");
				$('#problemsToggle').css("color","#FF5E55");

				//places toggle return to normal
				$('#placesToggle').css("background-color","white");
				$('#placesToggle').css("color","#FF5E55");

				//places toggle return to normal
				$('#storiesToggle').css("background-color","#FF5E55");
				$('#storiesToggle').css("color","white");

				//all toggle when selected
				$('#allToggle').css("background-color","white");
				$('#allToggle').css("color","#FF5E55");
			} else {
				onMapPlaces = true;
				onMapProblem = true;
				onMapStories = true;
				for (const e of markerRef) {
					console.log(e);
					e.style.display = "block";
				}
				for (const e of markerRefPlace) {
					console.log(e);
					e.style.display = "block";
				}
				for (const e of markerRefStory) {
					console.log(e);
					e.style.display = "block";
				}
				//problems toggle when selected
				$('#problemsToggle').css("background-color","white");
				$('#problemsToggle').css("color","#FF5E55");

				//places toggle return to normal
				$('#placesToggle').css("background-color","white");
				$('#placesToggle').css("color","#FF5E55");

				//places toggle return to normal
				$('#storiesToggle').css("background-color","white");
				$('#storiesToggle').css("color","#FF5E55");
			}

		});




	};

}





























