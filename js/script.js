var w = 820;
var h = 560;
var base;
var alphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var xScale=d3.scale.ordinal().rangeBands([0,780]);
var yScale=d3.scale.linear().range([h,0]);
var yaxisglyph1, yaxisglyph2;
var yaxis1, yaxis2;
var svg;

d3.json("data/new_data.json", init);
	function init(json){
		console.log(json);

		var countArray = [];
		for(i=0; i < alphabets.length; i++){
			for (j = 0; j < json[alphabets[i]].length; j++){
				countArray.push(json[alphabets[i]][j].count);
			}
		}
		
		xScale.domain(alphabets);
		yScale.domain([0,d3.max(countArray)]);
			
		svg = d3.select("#chart")
						.append("svg")
						.attr("width", w)
						.attr("height", h+20);
		svg.append("svg")
			.attr("class", "scatterContainer");
						
		for(i=0; i < alphabets.length; i++){
			d3.select(".scatterContainer")
				.append("svg")
				.attr("class", "col"+alphabets[i])
				.selectAll("rect")
			   .data(json[alphabets[i]])
			   .enter()
			   .append("rect")
				.attr("x", function(d) {
					return xScale(alphabets[i]);
			   })
				.attr("y", function(d) {
					return yScale(d.count);
			   })
				.attr("transform", "translate(20,10)")
				.attr("width", 28)
				.attr("height", 5);			
		}
			
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
			.attr("class", "yaxisglyph1")
			.attr("transform", "translate(" + (w-20) + ", 0)");
			yaxis1 = d3.svg.axis()
			.tickSize([1])
			.scale( yScale ) 
			.orient("right") 
			.ticks( 6 ); 
			yaxisglyph1.call(yaxis1) 

			yaxisglyph2 = svg
			.append("svg")
			.append("g")
			.attr("class", "yaxisglyph2")
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
	
	d3.select("#animate").on("click", function(){
		base = h-15;
		
		var ajaxFired = false;
		for(i=0; i < alphabets.length; i++){
			//console.log(alphabets[i]);
			//console.log(d3.selectAll(".col"+alphabets[i]+" rect"))//
			d3.selectAll(".col"+alphabets[i]+" rect")
							  .transition()
							  .duration(750)
							  .attr("y", function(d, i){return base - i*5;})
							  .each("end", function(){
									if (!ajaxFired){
										d3.json("data/new_2data.json", getNewData);
										ajaxFired = true;
									}
							  });
							  
		}
		function getNewData(data){
			console.log(data);
			var countArray = [];
			for(i=0; i < alphabets.length; i++){
				for (j = 0; j < data[alphabets[i]].length; j++){
					countArray.push(data[alphabets[i]][j].count);
				}
			}
			yScale.domain([0,d3.max(countArray)]);
			yaxis1.scale( yScale ) 
			//yaxis2.scale( yScale ) 
			
			for(i=0; i < alphabets.length; i++){
				d3.selectAll(".col"+alphabets[i]+" rect").remove();
			}
			svg.transition().duration(750)
			 .selectAll(".yaxisglyph1").call(yaxis1)
			svg.transition().duration(750)
			 .selectAll(".yaxisglyph2").call(yaxis2)
			
			for(i=0; i < alphabets.length; i++){
				d3.select(".col"+alphabets[i])
			   .selectAll("rect")
			   .data(data[alphabets[i]])
			   .enter()
			   .append("rect")
				.attr("x", function(d) {
					return xScale(alphabets[i]);
			   })
				.attr("y", function(d,i) {
					return base - i*5;
			   })
				.attr("transform", "translate(20,0)")
				.attr("width", 28)
				.attr("height", 5)
				.transition().duration(750)
				.attr("y", function(d){return yScale(d.count);})
			}
		}
		//var t1 = t0.transition();
		//t1.console.log("something");
	/*for(i=0; i < alphabets.length; i++){
			var currRects = d3.selectAll(".col"+alphabets[i]+" rect");
			totalHeight = currRects[0].length*5;
			d3.select(".col"+alphabets[i])
				    .append("rect")
					.attr("class", "newRect")
					.attr("height", totalHeight)
					.attr("x", function(d) {
						return xScale(alphabets[i]);
				   })
					.attr("transform", "translate(20,10)")
					.attr("width", 28)
					.attr("y", base-totalHeight-5)			
		}*/
	}) 
	
	}