var margin = {top: 3, right: 2, bottom: 5, left: 5};
var width = 500 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var xScale = d3.scaleLinear().domain([0,100]).range([0,width]);
var yScale = d3.scaleLinear().domain([0,100]).range([height,0]);
var zScale = d3.scaleLinear().domain([0,100]).range([0,11]);
var cScale = d3.scaleLinear().domain([0,100]).range(["grey","blue"]);

var myUpdate = d3.select("body")
	.selectAll("svg")