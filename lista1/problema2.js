	  var margin = {top: 3, right: 2, bottom: 5, left: 5};
	  var width = 500 - margin.left - margin.right;
      var height = 500 - margin.top - margin.bottom;

	  var xScale = d3.scaleLinear().domain([0,100]).range([0,width]);
      var yScale = d3.scaleLinear().domain([0,100]).range([height,0]);
      var zScale = d3.scaleLinear().domain([0,100]).range([0,11]);
	  var cScale = d3.scaleLinear().domain([0,100]).range(["grey","blue"]);

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
			.attr("class","xAxis")
			.attr("transform","translate(30,"+(height-margin.top+22)+")");
	  	var xAxis = d3.axisBottom(xScale);
	  		xAxisGroup.call(xAxis);
	  	var yAxisGroup = mySVG.append("g")
			.attr("class","yAxis")
			.attr("transform","translate(18,10)");
	  	var yAxis = d3.axisLeft(yScale);
	  		yAxisGroup.call(yAxis);

      	var N = Math.floor(Math.random() * (50-10)) + 10;
	  	var dataset = [[]];
	  	var x1 = Math.floor(Math.random() * 100);
	  	var y1 = Math.floor(Math.random() * 100);
	  	var z1 = Math.floor(Math.random() * 100);
	  	var w1 = Math.floor(Math.random() * 100);
	  		dataset[0][0] = x1;
	  		dataset[0][1] = y1;
	  		dataset[0][2] = z1;
	  		dataset[0][3] = w1;
	  	var copiaN = N;
	 	var contador = 0;

	 	while (contador < N-1) {
	  		contador++;
	  		dataset.push({});
	  		x1 = Math.floor(Math.random() * 100);
	  		y1 = Math.floor(Math.random() * 100);
	  		z1 = Math.floor(Math.random() * 100);
	  		w1 = Math.floor(Math.random() * 100);
	  		dataset[contador][0] = x1;
	  		dataset[contador][1] = y1;
	  		dataset[contador][2] = z1;
	  		dataset[contador][3] = w1;
	  	}

	  	mySVG
			.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("transform","translate(20, 0)")
			.attr("r",function(d){return zScale(d[2]);})
			.attr("cx",function(d){return xScale(d[0])+10;})
			.attr("cy",function(d){return yScale(d[1])+10;})
			.attr("fill",function(d){return cScale(d[3]);});

		myN = d3.select("body")
	  		.attr("N", function(d){return N;})
	  		.append("text")
			.text("\n      N = " + N)
			.attr("x", 10)
       	 	.attr("y", 29)
       	 	.attr("font-family", "sans-serif")
       	 	.attr("font-size", "20px")
       	 	.attr("fill", "red");
      }