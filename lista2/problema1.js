var margin = {top: 3, right: 2, bottom: 5, left: 5};
var width = 500 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var xScale = d3.scaleLinear().domain([0,100]).range([0,width]);
var yScale = d3.scaleLinear().domain([0,100]).range([height,0]);
var zScale = d3.scaleLinear().domain([0,100]).range([0,11]);
var cScale = d3.scaleLinear().domain([0,100]).range(["grey","blue"]);

var myUpdate = d3.select("body")
	.selectAll("svg")

var mySVG = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right + 40)
		.attr("height", height + margin.top + margin.bottom + 30)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var xAxisGroup = mySVG.append("g")
			.attr("class","xAxis")
			.attr("transform","translate(20,"+(height-margin.top+21)+")");
	  	var xAxis = d3.axisBottom(xScale)
	  		.ticks(3);
	  		xAxisGroup.call(xAxis);
	  	var yAxisGroup = mySVG.append("g")
			.attr("class","yAxis")
			.attr("transform","translate(20,18)");
	  	var yAxis = d3.axisLeft(yScale);
	  		yAxisGroup.call(yAxis);