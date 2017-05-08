//Width and height
var w = 500;
var h = 300;

//Define path generator
var path = d3.geoPath();

//Create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);
						
d3.csv("us-ag-productivity-2004.csv", function(data){
	var color = d3.scaleLinear().range(["#e5f5f9","#2ca25f"]);
	color.domain([ d3.min(data, function(d) { return d.value; }),
		d3.max(data, function(d) { return d.value; }) ]);
	d3.json("us-states.json", function(json) {
		for (var i = 0; i < data.length; i++) {
			var dataState = data[i].state;
			var dataValue = parseFloat(data[i].value);
			for (var j = 0; j < json.features.length; j++) {
				var jsonState = json.features[j].properties.name;
				if (dataState == jsonState) {
					json.features[j].properties.value = dataValue;
					break; } } }
				
		//Bind data and create one path per GeoJSON feature
		svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("fill", function(d) {return color(d.properties.value);});
	
			
	});
			
})
			
var projection = d3.geoAlbersUsa()
	.translate([w/2, h/2])
	.scale([500]);

var zoom = d3.zoom()
    // no longer in d3 v4 - zoom initialises with zoomIdentity, so it's already at origin
    // .translate([0, 0]) 
    // .scale(1) 
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

var path = d3.geoPath()
	.projection(projection);

function zoomed() {
  g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
  // g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); // not in d3 v4
  g.attr("transform", d3.event.transform); // updated for d3 v4
}