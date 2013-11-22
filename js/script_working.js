var w = 820;
var h = 560;
var alphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

d3.json("data/sample_data.json", init);
	function init(json){
		console.log(json);
		var xScale=d3.scale.ordinal()
			.domain(alphabets)
			.rangeBands([0,780]);
		var yScale=d3.scale.linear()
			.domain([0,d3.max(json, function(d){return d.count;})])
			.range([h,0]);
			
		var svg = d3.select("#chart")
					.append("svg")
					.attr("width", w)
					.attr("height", h+20);
		svg.append("svg")
			.selectAll("rect")
		   .data(json)
		   .enter()
		   .append("rect")
			.attr("x", function(d) {
				var firstAlpha = d.word.substring(0,1); 
				firstAlpha = firstAlpha.toUpperCase();
				console.log(firstAlpha);
				return xScale(firstAlpha);
		   })
			.attr("y", function(d) {
				console.log(d.count);
				return yScale(d.count);
		   })
	   	    .attr("transform", "translate(20,0)")
			.attr("width", 28)
			.attr("height", 5)
			
		svg.selectAll("line.horizontalGrid").data(yScale.ticks(6)).enter()
           .append("line")
           .attr(
       {
           "class":"horizontalGrid",
           "x1" : (0,20),
           "x2" : (w-20),
           "y1" : function(d){ return yScale(d);},
		   "y2" : function(d){ return yScale(d);},
           "fill" : "none",
           "shape-rendering" : "crispEdges",
           "stroke" : "black",
           "stroke-width" : "1px"
       })
	   .style("stroke-dasharray", ("3, 3")); 
			
			yaxisglyph1 = svg
			.append("svg")
			.append("g")
			.attr("transform", "translate(" + (w-20) + ", 0)");
			yaxis1 = d3.svg.axis()
			.tickSize([1])
		//	.innerTickSize([1])
		//	.tickSubdivide(0)
			.scale( yScale ) 
			.orient("right") 
			.ticks( 6 ); 
			yaxisglyph1.call(yaxis1) 

			yaxisglyph2 = svg
			.append("svg")
			.append("g")
			.attr("transform", "translate(20, 0)");
			yaxis2 = d3.svg.axis()
			.tickSize([1])
			.scale( yScale ) 
			.orient("left") 
			.ticks( 6 ); 
			yaxisglyph2.call(yaxis2)

			xaxisglyph = svg
			.append("svg")
			.append("g")
			.attr("transform", "translate(20," + (h) + ")");
			xaxis = d3.svg.axis()
			.tickValues(alphabets)
			.tickSize([1])
			.scale(xScale)
			.orient("bottom")
			xaxisglyph.call(xaxis)
	}