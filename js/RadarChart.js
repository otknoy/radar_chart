function drawRadarChart(labels, data, maxValue) {
    var width = 480;
    var height = 480;
    var centerX = width  / 2;
    var centerY = height / 2;
    var r = 0.8*(width/2);
    var colors = ["red", "green", "blue"]; 

    var svg = d3.select('div.chart')
	    .append('svg')
	    .attr('width', width)
	    .attr('height', height);

    var scale = d3.scale.linear()
	    .domain([0, maxValue]).range([0, r]);
    var line = d3.svg.line()
	    .x(function(d, i) { return scale(d) * Math.cos(2*Math.PI/labels.length * i) + centerX; })
	    .y(function(d, i) { return scale(d) * Math.sin(2*Math.PI/labels.length * i) + centerY; })
	    .interpolate("linear-closed");

    // grid
    var grid = new Array(4);
    for (var i = 0; i < grid.length; i++) {
	grid[i] = new Array(labels.length);
	for (var j = 0; j < grid[i].length; j++) {
	    grid[i][j] = (i+1)/grid.length * maxValue;
	}
    }
    svg.selectAll("path.data")
	.data(grid).enter()
	.append("path")
	.attr("d", function(d, i) { return line(d); })
	.style("stroke", "gray")
	.style("stroke-width", 0.5)
	.style("fill", "none");

    // axis
    svg.selectAll("line")
	.data(grid[grid.length-1]).enter()
	.append("line")
	.attr("x1", function(d, i) { return centerX; })
	.attr("y1", function(d, i) { return centerY; })
	.attr("x2", function(d, i) { return r * Math.cos(2*Math.PI/labels.length * i) + centerX; })
	.attr("y2", function(d, i) { return r * Math.sin(2*Math.PI/labels.length * i) + centerY; })
	.style("stroke", "gray");

    // axis label
    var axisLabel = svg.selectAll("a")
	    .data(labels)
	    .enter()
	    .append("text")
            .text(function(d){return d;})
            .attr("text-anchor", "middle")
            .attr("x", function(d, i) { return 1.1*r * Math.cos(2*Math.PI/labels.length * i) + centerX; })
            .attr("y", function(d, i) { return 1.1*r * Math.sin(2*Math.PI/labels.length * i) + centerY; });
    
    // data 
    svg.selectAll("path.data")
	.data(data).enter()
	.append("path")
	.attr("d", function(d, i) { return line(d); })
	.style("stroke", function(d, i) { return colors[i]; })
	.style("fill", "none");
}

$(function() {
    var labels = ["1群", "2群", "3群", "4群", "5群", "6群"];
    var data = [[13, 1, 8, 4, 9, 9],
		[13, 7, 9, 10, 9, 9],
		[15, 10, 15, 10, 15, 14]];
    var maxValue = 15;
    
    drawRadarChart(labels, data, maxValue);
});
