/*
L.mapbox.accessToken = 'pk.eyJ1IjoibWluaGR1b25nMjQzIiwiYSI6ImNqbHNvM3l0cTAxaXMzcHBiYnpvNjBsaXAifQ.NO598_UKYbyOIok45baiWA';
var countyData = new L.GeoJSON.AJAX("static/GEOJSON/USCounties_2.geojson", {
    onEachFeature(feature, layer) {
        counties.push({
            "county": layer.feature.properties["NAME"], "coordinates": layer.feature.geometry.coordinates,
            "Income": layer.feature.properties["Income"]
        })
    }
});
*/
/*
var county1 = {
  "type": "Feature",
  "properties": {
    "GEO_ID": "0500000US31055",
    "STATE": "NE",
    "COUNTY": "055",
    "NAME": "Douglas",
    "LSAD": "County",
    "CENSUSAREA": 328.455,
    "Income": 78000
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -95.923219,
          41.191046
        ],
        [
          -96.158333,
          41.190762
        ],
        [
          -96.327399,
          41.189999
        ],
        [
          -96.350598,
          41.265192
        ],
        [
          -96.47072,
          41.393239
        ],
        [
          -96.329012,
          41.393136
        ],
        [
          -95.9393,
          41.393184
        ],
        [
          -95.93831,
          41.392162
        ],
        [
          -95.956791,
          41.349196
        ],
        [
          -95.956691,
          41.345496
        ],
        [
          -95.953091,
          41.339896
        ],
        [
          -95.939291,
          41.328897
        ],
        [
          -95.92569,
          41.322197
        ],
        [
          -95.91379,
          41.320197
        ],
        [
          -95.90249,
          41.273398
        ],
        [
          -95.924891,
          41.211198
        ],
        [
          -95.927491,
          41.202198
        ],
        [
          -95.92599,
          41.195698
        ],
        [
          -95.923219,
          41.191046
        ]
      ]
    ]
  }
};

var county2 = {"type":"Feature","properties":{"GEO_ID":"0500000US31061","STATE":"NE","COUNTY":"061","NAME":"Franklin","LSAD":"County","CENSUSAREA":575.816,"Income":78000},"geometry":{"type":"Polygon","coordinates":[[[-98.726373,40.002222],[-98.774941,40.002336],[-98.777203,40.002359],[-98.82059,40.002319],[-98.834456,40.002363],[-98.934792,40.002205],[-98.960919,40.002271],[-98.961009,40.002317],[-98.971721,40.002268],[-98.972287,40.002245],[-98.992135,40.002192],[-99.018701,40.002333],[-99.020338,40.002264],[-99.067022,40.00217],[-99.085597,40.002133],[-99.11351,40.002193],[-99.123033,40.002165],[-99.169816,40.001925],[-99.178965,40.001977],[-99.179133,40.001977],[-99.179403,40.350681],[-98.726827,40.350398],[-98.726373,40.002222]]]}};

var counties2 = [county1, county2];
*/

//mapboxgl.accessToken = 'pk.eyJ1IjoibG9va3VwbWFuIiwiYSI6ImNqbW41cmExODBxaTEzeHF0MjhoZGg1MnoifQ.LGL5d5zGa1z6ms-IVyn7sw';
var counties = [];
var countyData = "";
$.get("static/GEOJSON/USCounties_2.geojson", function(data) { //load JSON file from static/GEOJSON
    countyData = jQuery.parseJSON(data);
    var features=countyData["features"];
    features.forEach(function(feature){
        counties.push({
            "county": feature.properties["NAME"], "coordinates": feature.geometry.coordinates,
            "Income": feature.properties["Income"]
        })
    })
});
