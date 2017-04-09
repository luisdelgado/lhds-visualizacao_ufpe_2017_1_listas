// Setando dimensoes e margens do SVG
var margin = {top: 3, right: 2, bottom: 5, left: 5};
var width = 500 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// Criando escalas
var xScale = d3.scaleLinear().domain([0,100]).range([0,width]);
var yScale = d3.scaleLinear().domain([0,1000]).range([height,0]);
var zScale = d3.scaleLinear().domain([1000,0]).range([height,0]);
var cScale = d3.scaleLinear().domain([1000,0]).range([0,width]);

// Criando SVG
var myUpdate = d3.select("body")
	.selectAll("svg")

var mySVG = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right + 40)
		.attr("height", height + margin.top + margin.bottom + 30)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Contando numero de viagens
var TAM = 0;
var GOL = 0;
var Azul = 0;

trips.map(function(d) {
	if (d.carrier == "Gol") {
		GOL = GOL + 1;
	};
	if (d.carrier == "Tam") {
		TAM = TAM + 1;
	};
	if (d.carrier == "Azul") {
		Azul = Azul + 1;
	};
});

// Filtrando apenas dados necessários
var empresas = [{nome: "Tam", viagens: TAM}, {nome: "Gol", viagens: GOL}, {nome: "Azul", viagens: Azul}];

// Criando eixos
var xAxisGroup = mySVG.append("g")
		.attr("class","xAxis")
		.attr("transform","translate(30,"+(height-margin.top+21)+")");
var xAxis = d3.axisBottom(xScale)
		.ticks(0);
xAxisGroup.call(xAxis);
var yAxisGroup = mySVG.append("g")
		.attr("class","yAxis")
		.attr("transform","translate(30,18)");
var yAxis = d3.axisLeft(yScale);
yAxisGroup.call(yAxis);

// Criando histograma
var histogram = d3.histogram()
    .domain(xScale.domain())
    .thresholds(xAxis.ticks(20));

mySVG
	.selectAll("rect")
    .data(empresas)
    .enter().append("rect")
    .attr("transform","translate(30," + (height-margin.top+21)+ ") scale(1,-1)")
    .attr("x", function(d){return zScale(d.viagens);})
    .attr("y", 0)
    .attr("width", 50)
    .attr("height", function(d) {return zScale(d.viagens);})
    .attr("fill", "red");

// Colocando compainhas 
var text = mySVG.selectAll("circle")
	.data(empresas)
	.enter()
	.append("text");

var labelTexts = text
	.attr("x", function(d) {console.log(d.viagens);return zScale(d.viagens)+42; })
    .attr("y", function(d) {return height + margin.top + margin.bottom + 20;})
    .text( function (d) { return d.nome; })
    .attr("font-family", "sans-serif")
	.attr("font-size", "10px")
    .attr("fill", "black");
