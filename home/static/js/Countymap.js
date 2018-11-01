
mapboxgl.accessToken = 'pk.eyJ1IjoibG9va3VwbWFuIiwiYSI6ImNqbW41cmExODBxaTEzeHF0MjhoZGg1MnoifQ.LGL5d5zGa1z6ms-IVyn7sw';
var countyData = "";
var communityData = "";
var k12Data = "";
$.get("static/GEOJSON/CommunityPartners.geojson", function(data) { //load JSON file from static/GEOJSON
    communityData = jQuery.parseJSON(data);
    var features=communityData["features"];
	var count=0;
	features.forEach(function(feature){
	    var polyid = 0;
		feature.properties["id"]=count;
		count++;
		if (feature.geometry !== null) {
            var point = feature.geometry.coordinates;
            point = turf.point(point);
            for (var i = 0; i < polygons.length; i++){
                var poly = polygons[i];
                poly = turf.polygon(poly);   //variable polygons is called from DistrictList.js
                if (turf.booleanPointInPolygon(point,poly)) {
                    polyid = i+1;
                }
            }

        }
        feature.properties["districtnumber"] = polyid;
	});
	communityData["features"]=features;
});
$.get("static/GEOJSON//K-12Partners.geojson", function(data) { //load JSON file from static/GEOJSON
    k12Data = jQuery.parseJSON(data);
});
$.get("static/GEOJSON/USCounties_2.geojson", function(data) { //load JSON file from static/GEOJSON
    countyData = jQuery.parseJSON(data);
});

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-95.957309, 41.276479],
    zoom: 4
});

var popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false
});

function parseDescription(message) {
    var string = "";


    for (var i in message) {

        if (i == "CommunityPartner") {
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        }if (i == "K-12 Partner") {
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i =="Address"){
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "City"){
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "State"){
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "WeitzCECPartner"){
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "PhoneNumber") {
            string += '<span style="font-weight:bold">' + i + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "Website"){
            var website = message[i];
            var base = "http://";
            if (!website.includes("http")){
                website = base.concat(website);
            }
            string += `<span style="font-weight:bold">${i}</span>: <a target="_blank" href="${website}" class="popup"
                        style="color:darkblue">${website}</a><br>`;
        } else if (i == "STATE"){
            string += '<span style="font-weight:bold">' + 'State' + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "NAME"){
            string += '<span style="font-weight:bold">' + 'County' + '</span>' + ": " + message[i] + "<br>";
        } else if (i == "Income"){
            string += '<span style="font-weight:bold">' + 'Household Income' + '</span>' + ": " + message[i] + "<br>";
        } else if (i=="districtnumber"){
            string += '<span style="font-weight:bold">' + "District Number" + '</span>' + ": " + message[i] + "<br>"
        }
    }
    return string;
};

map.on("load",function() {

    //Get Legislative District Data
    map.addSource('countyData', {
        type: 'geojson',
        data: countyData,
    });
    map.addSource('communityData', {
        type: 'geojson',
        data: communityData,
    });
    //Get k12Partner data
    map.addSource("k12Data", {
        type: "geojson",
        data: k12Data,
    });

    communityData.features.forEach(function(feature){
		var primary=feature.properties["PrimaryMissionFocus"];

		if(primary=="Social Justice"){
			layerID="show1";
			if(!map.getLayer(layerID)){
				map.addLayer({
					"id":layerID,
					"type":"circle",
					"source":"communityData",
					"paint":{
						"circle-radius": 8,
						"circle-opacity": 0.8,
						"circle-color": '#2A0A12'
					},
					"filter": ["all",["==", "PrimaryMissionFocus", "Social Justice"],['in',"time","Spring 2018","Fall 2018","Summer 2018","winter 2018"]]
				})
			}
		}
		else if(primary=="Educational Support"){
			layerID="show2";
			if(!map.getLayer(layerID)){
				map.addLayer({
					"id":layerID,
					"type":"circle",
					"source":"communityData",
					"paint":{
						"circle-radius": 8,
						"circle-opacity": 0.8,
						"circle-color": '#fbb03b'
					},
					"filter": ["all",["==", "PrimaryMissionFocus", "Educational Support"],['in',"time","Spring 2018","Fall 2018","Summer 2018","winter 2018"]]
				})
			}
		}
		else if(primary=="Economic Sufficiency"){
			layerID="show3";
			if(!map.getLayer(layerID)){
				map.addLayer({
					"id":layerID,
					"type":"circle",
					"source":"communityData",
					"paint":{
						"circle-radius": 8,
						"circle-opacity": 0.8,
						"circle-color": '#0B0B61'
					},
					"filter": ["all",["==", "PrimaryMissionFocus", "Economic Sufficiency"],['in',"time","Spring 2018","Fall 2018","Summer 2018","winter 2018"]]
				})
			}
		}
		else if(primary=="International Service"){
			layerID="show4";
			if(!map.getLayer(layerID)){
				map.addLayer({
					"id":layerID,
					"type":"circle",
					"source":"communityData",
					"paint":{
						"circle-radius": 8,
						"circle-opacity": 0.8,
						"circle-color": '#e55e5e'
					},
					"filter": ["all",["==", "PrimaryMissionFocus", "International Service"],['in',"time","Spring 2018","Fall 2018","Summer 2018","winter 2018"]]
				})
			}
		}
		else if(primary=="Environmental Stewardship"){
			layerID="show5";
			if(!map.getLayer(layerID)){
				map.addLayer({
					"id":layerID,
					"type":"circle",
					"source":"communityData",
					"paint":{
						"circle-radius": 8,
						"circle-opacity": 0.8,
						"circle-color": '#3bb2d0'
					},
					"filter": ["all",["==", "PrimaryMissionFocus", "Environmental Stewardship"],['in',"time","Spring 2018","Fall 2018","Summer 2018","winter 2018"]]
				})
			}
		}
		else if(primary=="Health & Wellness"){
			layerID="show6";
			if(!map.getLayer(layerID)){
				map.addLayer({
					"id":layerID,
					"type":"circle",
					"source":"communityData",
					"paint":{
						"circle-radius": 8,
						"circle-opacity": 0.8,
						"circle-color": '#ba55d3'
					},
					"filter": ["all",["==", "PrimaryMissionFocus", "Health & Wellness"],['in',"time","Spring 2018","Fall 2018","Summer 2018","winter 2018"]]
				})
			}
		}

	})

 	//Add k12 style
	map.addLayer({
		"id":"k12",
		"type":"circle",
		"source":"k12Data",
		"paint":{
			"circle-radius": 8,
			"circle-opacity": 0.8,
			"circle-color": '#0000AA'
		},
		//Default filter year to 2018 in map
		"filter":['in',"time","Spring 2018","Fall 2018","Summer 2018","winter 2018"]
	});
	//******************************Add a county map **********************************
    countyData.features.forEach(function(feature){
        var income=feature.properties["Income"];

        if(income < 30000) {
              layerID = "income1";
              if (!map.getLayer(layerID)) {
                  map.addLayer({
                      "id": layerID,
                      "type": "fill",
                      "source": "countyData",
                      'layout': {},
                      'paint': {
                          "fill-color": "#ADFF2F",
                          "fill-opacity": ["case",
                              ["boolean", ["feature-state", "hover"], false],
                              1,
                              0.2],
                          "fill-outline-color": "#888"
                      },
                      "filter": ["<", "Income", 30000]
                  })
              }
          }

          else if (30000 <= income && income < 60000) {
              layerID = "income2";
              if (!map.getLayer(layerID)) {
                  map.addLayer({
                      "id": layerID,
                      "type": "fill",
                      "source": "countyData",
                      'layout': {},
                      'paint': {
                          "fill-color": "#9ACD32",
                          "fill-opacity": ["case",
                              ["boolean", ["feature-state", "hover"], false],
                              1,
                              0.2],
                          "fill-outline-color": "#888"
                      },
                      "filter": ["all",
                          [">=", "Income", 30000],
                          ["<", "Income", 60000]
                      ]
                  })
              }
        }

          else if (60000 <= income && income < 80000) {
              layerID = "income3";
              if (!map.getLayer(layerID)) {
                  map.addLayer({
                      "id": layerID,
                      "type": "fill",
                      "source": "countyData",
                      'layout': {},
                      'paint': {
                          "fill-color": "#3CB371",
                          "fill-opacity": ["case",
                              ["boolean", ["feature-state", "hover"], false],
                              1,
                              0.2],
                          "fill-outline-color": "#888"
                      },
                      "filter": ["all",
                          [">=", "Income", 60000],
                          ["<", "Income", 80000]
                      ]
                  })
              }
        }
          else if (80000 <= income && income < 100000) {
              layerID = "income4";
              if (!map.getLayer(layerID)) {
                  map.addLayer({
                      "id": layerID,
                      "type": "fill",
                      "source": "countyData",
                      'layout': {},
                      'paint': {
                          "fill-color": "#228B22",
                          "fill-opacity": ["case",
                              ["boolean", ["feature-state", "hover"], false],
                              1,
                              0.2],
                          "fill-outline-color": "#888"
                      },
                      "filter": ["all",
                          [">=", "Income", 80000],
                          ["<", "Income", 100000]
                      ]
                  })
              }
        }
          else if (100000 <= income ) {
              layerID = "income5";
              if (!map.getLayer(layerID)) {
                  map.addLayer({
                      "id": layerID,
                      "type": "fill",
                      "source": "countyData",
                      'layout': {},
                      'paint': {
                          "fill-color": "#006400",
                          "fill-opacity": ["case",
                              ["boolean", ["feature-state", "hover"], false],
                              1,
                              0.2],
                          "fill-outline-color": "#888"
                      },
                      "filter": [">=", "Income", 100000]
                  })
              }
        }
     })

	//******************************Add a clickable legend**********************************

    var comlist=["show1","show2","show3","show4","show5","show6", "k12"];
			var edu=document.getElementById("all");
				edu.addEventListener("click",function(e){
					comlist.forEach(function (com) {
						if (com == "show2") {
							map.setLayoutProperty(com, 'visibility', 'visible');
						} else {
							map.setLayoutProperty(com, 'visibility', 'visible');
						}
					})

				})

			var edu=document.getElementById("educational");
			edu.addEventListener("click",function(e){
				comlist.forEach(function (com) {
					if (com == "show2") {
						map.setLayoutProperty(com, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(com, 'visibility', 'none');
					}
				})

			})

			var edu=document.getElementById("economic");
			edu.addEventListener("click",function(e){
				comlist.forEach(function (com) {
					if (com == "show3") {
						map.setLayoutProperty(com, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(com, 'visibility', 'none');
					}
				})

			})

			var edu=document.getElementById("service");
			edu.addEventListener("click",function(e){
				comlist.forEach(function (com) {
					if (com == "show4") {
						map.setLayoutProperty(com, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(com, 'visibility', 'none');
					}
				})

			})

			var edu=document.getElementById("environmental");
			edu.addEventListener("click",function(e){
				comlist.forEach(function (com) {
					if (com == "show5") {
						map.setLayoutProperty(com, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(com, 'visibility', 'none');
					}
				})

			})

			var edu=document.getElementById("health");
			edu.addEventListener("click",function(e){
				comlist.forEach(function (com) {
					if (com == "show6") {
						map.setLayoutProperty(com, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(com, 'visibility', 'none');
					}
				})

			})
			var edu=document.getElementById("justice");
			edu.addEventListener("click",function(e){
				comlist.forEach(function (com) {
					if (com == "show1") {
						map.setLayoutProperty(com, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(com, 'visibility', 'none');
					}
				})

			})


    //****************************filter year*******************************************
    var selectYear = document.getElementById("selectYear");
    selectYear.addEventListener("change", function(e) {
        var value = e.target.value.trim().toLowerCase();

        if (value == 2018) {
            map.setFilter("show1",
                ["all", ["==", "PrimaryMissionFocus", "Social Justice"],
                    ['in', "time", "Spring 2018", "Fall 2018", "Summer 2018", "winter 2018"]
                ]
            )
            map.setFilter("show2",
                ["all", ["==", "PrimaryMissionFocus", "Educational Support"],
                    ['in', "time", "Spring 2018", "Fall 2018", "Summer 2018", "winter 2018"]
                ]
            )
            map.setFilter("show3",
                ["all", ["==", "PrimaryMissionFocus", "Economic Sufficiency"],
                    ['in', "time", "Spring 2018", "Fall 2018", "Summer 2018", "winter 2018"]
                ]
            )
            map.setFilter("show4",
                ["all", ["==", "PrimaryMissionFocus", "International Service"],
                    ['in', "time", "Spring 2018", "Fall 2018", "Summer 2018", "winter 2018"]
                ]
            )
            map.setFilter("show5",
                ["all", ["==", "PrimaryMissionFocus", "Environmental Stewardship"],
                    ['in', "time", "Spring 2018", "Fall 2018", "Summer 2018", "winter 2018"]
                ]
            )
            map.setFilter("show6",
                ["all", ["==", "PrimaryMissionFocus", "Health & Wellness"],
                    ['in', "time", "Spring 2018", "Fall 2018", "Summer 2018", "winter 2018"]
                ]
            )
        } else if (value == 2017) {

            map.setFilter("show1",
                ["all", ["==", "PrimaryMissionFocus", "Social Justice"],
                    ['in', "time", "Spring 2017", "Fall 2017", "Summer 2017", "winter 2017"]
                ]
            )
            map.setFilter("show2",
                ["all", ["==", "PrimaryMissionFocus", "Educational Support"],
                    ['in', "time", "Spring 2017", "Fall 2017", "Summer 2017", "winter 2017"]
                ]
            )
            map.setFilter("show3",
                ["all", ["==", "PrimaryMissionFocus", "Economic Sufficiency"],
                    ['in', "time", "Spring 2017", "Fall 2017", "Summer 2017", "winter 2017"]
                ]
            )
            map.setFilter("show4",
                ["all", ["==", "PrimaryMissionFocus", "International Service"],
                    ['in', "time", "Spring 2017", "Fall 2017", "Summer 2017", "winter 2017"]
                ]
            )
            map.setFilter("show5",
                ["all", ["==", "PrimaryMissionFocus", "Environmental Stewardship"],
                    ['in', "time", "Spring 2017", "Fall 2017", "Summer 2017", "winter 2017"]
                ]
            )
            map.setFilter("show6",
                ["all", ["==", "PrimaryMissionFocus", "Health & Wellness"],
                    ['in', "time", "Spring 2017", "Fall 2017", "Summer 2017", "winter 2017"]
                ]
            )
        } else { //all

            map.setFilter("show1",
                ["==", "PrimaryMissionFocus", "Social Justice"]
            )
            map.setFilter("show2",
                ["==", "PrimaryMissionFocus", "Educational Support"]
            )
            map.setFilter("show3",
                ["==", "PrimaryMissionFocus", "Economic Sufficiency"]
            )
            map.setFilter("show4",
                ["==", "PrimaryMissionFocus", "International Service"]
            )
            map.setFilter("show5",
                ["==", "PrimaryMissionFocus", "Environmental Stewardship"]
            )
            map.setFilter("show6",
                ["==", "PrimaryMissionFocus", "Health & Wellness"]
            )
        }

    })

	//********************************************************************************
	map.on("click","k12",function(e){
		map.getCanvas().style.cursor = 'pointer';
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description =  e.features[0].properties;
		description=parseDescription(description);

		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		popup.setHTML(description)
		.addTo(map);
		close();
	});

	map.on("click","show1",function(e){
		map.getCanvas().style.cursor = 'pointer';
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description =  e.features[0].properties;
		description=parseDescription(description);

		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		popup.setLngLat(coordinates)
		.setHTML(description)
		.addTo(map);
		close();
	});
	map.on("click","show2",function(e){
		map.getCanvas().style.cursor = 'pointer';
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description =  e.features[0].properties;
		description=parseDescription(description);

		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		popup.setLngLat(coordinates)
		.setHTML(description)
		.addTo(map);
		close();
	});
	map.on("click","show3",function(e){
		map.getCanvas().style.cursor = 'pointer';
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description =  e.features[0].properties;
		description=parseDescription(description);

		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		popup.setLngLat(coordinates)
		.setHTML(description)
		.addTo(map);
		close();
	});
	map.on("click","show4",function(e){
		map.getCanvas().style.cursor = 'pointer';
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description =  e.features[0].properties;
		description=parseDescription(description);

		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		popup.setLngLat(coordinates)
		.setHTML(description)
		.addTo(map);
		close();
	});
	map.on("click","show5",function(e){
		map.getCanvas().style.cursor = 'pointer';
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description =  e.features[0].properties;
		description=parseDescription(description);

		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		popup.setLngLat(coordinates)
		.setHTML(description)
		.addTo(map);
		close();
	});
	map.on("click","show6",function(e){
		map.getCanvas().style.cursor = 'pointer';
		var coordinates = e.features[0].geometry.coordinates.slice();
		var description =  e.features[0].properties;
		description=parseDescription(description);

		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		popup.setLngLat(coordinates)
		.setHTML(description)
		.addTo(map);
		close();
	});
	//******************************** Click on counties ************************************************
	map.on('click', 'income1', function (e) {
	    map.getCanvas().style.cursor = 'pointer';
	    var description =  e.features[0].properties;
		description=parseDescription(description);
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map);
    });
	map.on('click', 'income2', function (e) {
	    map.getCanvas().style.cursor = 'pointer';
	    var description =  e.features[0].properties;
		description=parseDescription(description);
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map);
    });
	map.on('click', 'income3', function (e) {
	    map.getCanvas().style.cursor = 'pointer';
	    var description =  e.features[0].properties;
		description=parseDescription(description);
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map);
    });
	map.on('click', 'income4', function (e) {
	    map.getCanvas().style.cursor = 'pointer';
	    var description =  e.features[0].properties;
		description=parseDescription(description);
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map);
    });
	map.on('click', 'income5', function (e) {
	    map.getCanvas().style.cursor = 'pointer';
	    var description =  e.features[0].properties;
		description=parseDescription(description);
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map);
    });
    /*
      map.on('mousemove', 'income1', function (e) {
       map.getCanvas().style.cursor = 'pointer';
       var description =  e.features[0].properties;
       description=parseDescription(description);
       popup.setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map)
   });
      map.on('mouseleave', 'income1', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

      map.on('mousemove', 'income2', function (e) {
       map.getCanvas().style.cursor = 'pointer';
       var description =  e.features[0].properties;
       description=parseDescription(description);
       popup.setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map)
   });
      map.on('mouseleave', 'income2', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

      map.on('mousemove', 'income3', function (e) {
       map.getCanvas().style.cursor = 'pointer';
       var description =  e.features[0].properties;
       description=parseDescription(description);
       popup.setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map)
   });
      map.on('mouseleave', 'income3', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });


      map.on('mousemove', 'income4', function (e) {
       map.getCanvas().style.cursor = 'pointer';
       var description =  e.features[0].properties;
       description=parseDescription(description);
       popup.setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map)
   });
      map.on('mouseleave', 'income4', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

      map.on('mousemove', 'income5', function (e) {
       map.getCanvas().style.cursor = 'pointer';
       var description =  e.features[0].properties;
       description=parseDescription(description);
       popup.setLngLat(e.lngLat)
            .setHTML(description)
            .addTo(map)
   });
      map.on('mouseleave', 'income5', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
*/
	//******************************** Filter by income levels ************************************************

    var countyList=["income1","income2","income3","income4","income5"];
			var edu=document.getElementById("allincome");
				edu.addEventListener("click",function(e){
					countyList.forEach(function (county) {
						if (county == "income1") {
							map.setLayoutProperty(county, 'visibility', 'visible');
						} else {
							map.setLayoutProperty(county, 'visibility', 'visible');
						}
					})

				})

			var edu=document.getElementById("lowincome");
			edu.addEventListener("click",function(e){
				countyList.forEach(function (county) {
					if (county== "income1") {
						map.setLayoutProperty(county, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(county, 'visibility', 'none');
					}
				})

			})

			var edu=document.getElementById("avgincome");
			edu.addEventListener("click",function(e){
				countyList.forEach(function (county) {
					if (county == "income2") {
						map.setLayoutProperty(county, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(county, 'visibility', 'none');
					}
				})

			})

			var edu=document.getElementById("midincome");
			edu.addEventListener("click",function(e){
				countyList.forEach(function (county) {
					if (county == "income3") {
						map.setLayoutProperty(county, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(county, 'visibility', 'none');
					}
				})

			})

			var edu=document.getElementById("highincome");
			edu.addEventListener("click",function(e){
				countyList.forEach(function (county) {
					if (county == "income4") {
						map.setLayoutProperty(county, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(county, 'visibility', 'none');
					}
				})

			})

			var edu=document.getElementById("topincome");
			edu.addEventListener("click",function(e){
				countyList.forEach(function (county) {
					if (county == "income5") {
						map.setLayoutProperty(county, 'visibility', 'visible');
					} else {
						map.setLayoutProperty(county, 'visibility', 'none');
					}
				})

			})



})