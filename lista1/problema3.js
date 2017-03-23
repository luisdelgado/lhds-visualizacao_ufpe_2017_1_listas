	  var preDataset = [[27.3, 28, 27.2, 25.1, 23, 21.8, 21.8, 23.3, 23.9, 24.8, 25.9, 26.3],
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
	  	for (; mes < 12-1; mes++) {
	  		contador++;
	  		dataset.push({});
	  		dataset[contador][0] = new Date (0, mes, 1);
	  		dataset[contador][1] = preDataset[intensidade][mes];
	  		dataset[contador][2] = intensidade;
	  	}
	  }

	  var margin = {top: 3, right: 2, bottom: 5, left: 5};
	  var width = 500 - margin.left - margin.right;
      var height = 500 - margin.top - margin.bottom;

	  var xScale = d3.scaleTime().domain([new Date(0, 0, 1), new Date(0, 11, 1)]).range([0,width])
      var yScale = d3.scaleLinear().domain([10,30]).range([0, height]);
	  var cScale = d3.scaleLinear().domain([0,2]).range(["orange", "blue", "grey"]);

      myButton = d3.select("body")    
  		.append("input")
  		.attr("type", "button")
  		.attr("name", "updateButton")
  		.attr("value", "Botão")
  		.attr("onclick", "update()");

      function update() {
      	var myUpdate = d3.select("body")
      		.selectAll("svg")
      		.remove();

      	myUpdate = d3.select("body")
      		.selectAll("text")
      		.remove();

      	var mySVG = d3.select("body").append("svg")
			.attr("width", width + margin.left + margin.right + 40)
			.attr("height", height + margin.top + margin.bottom + 30)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top +
			")");

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
			.attr("transform","translate(18,30)");
	  	var yAxis = d3.axisLeft(yScale)
	  		.ticks(7);
	  		yAxisGroup.call(yAxis);

	  	mySVG
			.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("transform","translate(30, 20)")
			.attr("r",10)
			.attr("cx",function(d){return xScale(d[0]);})
			.attr("cy",function(d){return yScale(d[1])+10;})
			.attr("fill",function(d){if (d[2]==0) {
				return "orange";
			} else {
				if (d[2]==1) {
					return "blue";
				} else {
					return "grey";
				}
			}});

      }