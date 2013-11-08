var w = 770;
var h = 560;

d3.json("data/sample_data.json", init);
	function init(json){
		console.log(json);

		var xScale=d3.scale.ordinal()
			.domain(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"])
			.rangeBands([0,520]);
		var yScale=d3.scale.linear()
			.domain([0,d3.max(json, function(d){return d.count;})])
			.range([h,0]);
			
		var svg = d3.select("#chart")
					.append("svg")
					.attr("width", w)
					.attr("height", h);
		svg.selectAll("rect")
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
			.attr("width", 20)
			.attr("height", 5)
	}