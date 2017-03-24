	
	// Fromatando dados
	var preDataset = [[34.2, 34.7, 33.5, 31.4, 29.7, 28.6, 29.3, 33, 35.2, 34.5, 35.3, 33.5],
				      [22.1, 22.4, 21.8, 19.7, 17.4, 16.3, 15.8, 17.1, 17.9, 19, 20.2, 21.1],
	  				  [18.7, 18.8, 18.2, 16.3, 13.8, 12.4, 11.7, 12.8, 13.9, 15.3, 16.6, 17.7]];

	var dataset = [[]];

	var intensidade = 0;
	var mes = 0;
	var contador = 0;

	dataset[contador][0] = new Date (0, mes, 1);
	dataset[contador][1] = preDataset[intensidade][mes];
	dataset[contador][2] = intensidade;

	for (; intensidade < 3; intensidade++) {
	  		mes = 0;
	  	for (; mes < 12; mes++) {
	  		contador++;
	  		dataset.push({});
	  		dataset[contador][0] = new Date (0, mes, 1);
	  		dataset[contador][1] = preDataset[intensidade][mes];
	  		dataset[contador][2] = intensidade;
	  	}
	}

	// Definindo margens
	var margin = {top: 3, right: 2, bottom: 5, left: 5};
	var width = 500 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // Criando escalas
	var xScale = d3.scaleTime().domain([new Date(0, 0, 1), new Date(0, 11, 1)]).range([0,width])
    var yScale = d3.scaleLinear().domain([10,40]).range([0, height]);
	var cScale = d3.scaleLinear().domain([0,2]).range(["red", "black", "blue"]);

	// Criando SVG
    var mySVG = d3.select("body").append("svg")
		.attr("width", width + margin.left + margin.right + 40)
		.attr("height", height + margin.top + margin.bottom + 30)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top +
		")");

	// Criando eixos
	var xAxisGroup = mySVG.append("g")
		.attr("id", "xAxis")
		.attr("class","xAxis")
		.attr("transform","translate(30,"+15+")");
	var xAxis = d3.axisTop(xScale)
		.tickSize(0)
		.tickFormat(d3.timeFormat("%b"))
  		xAxisGroup.call(xAxis);
  	var yAxisGroup = mySVG.append("g")
		.attr("class","yAxis")
		.attr("transform","translate(18,15)");
  	var yAxis = d3.axisLeft(yScale)
  		.ticks(7);
  		yAxisGroup.call(yAxis);

  	// Criando linhas
  	var myLine = d3.line()
  		.curve(d3.curveLinear)
   		.x(function(d) {return xScale(d[0])+30;})
   		.y(function(d) {return yScale(d[1])+15.75;});

   	// Criando pontos
  	mySVG
		.selectAll(".dot")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("transform","translate(30, 10)")
		.attr("class", "dot")
		.attr("r",0)
		.attr("cx",function(d){return xScale(d[0]);})
		.attr("cy",function(d){return yScale(d[1])+6;})
		.attr("fill",function(d){
			if (d[2]==0) {
				return "red";
			} else {
				if (d[2]==1) {
					return "black";
				} else {
					return "blue";
				}
			}
		});

	// Separando dados para cada linha
	var data = [];
	var data2 = [];
	var data3 = [];

	mySVG.selectAll("circle")
		.each(function(d){
			if (d[2] == 0) {
				return data.push(d);
			} else {
				if (d[2] == 1) {
					return data2.push(d);
				} else {
					return data3.push(d);
				}
			}
		});

	// Criando linhas
	mySVG
		.append("path")
     	.data([data])
     	.attr("fill", "none")
     	.attr("stroke", "red")
     	.attr("class", "line")
     	.attr("d", myLine);
    mySVG
		.append("path")
     	.data([data2])
     	.attr("fill", "none")
     	.attr("stroke", "grey")
     	.attr("class", "line")
     	.attr("d", myLine);   
  	mySVG
		.append("path")
     	.data([data3])
     	.attr("fill", "none")
     	.attr("stroke", "blue")
     	.attr("class", "line")
     	.attr("d", myLine);