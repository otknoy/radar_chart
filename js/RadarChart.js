function drawRadarChart(labels, data, maxValue) {
    var width = 480;
    var height = 480;
    var centerX = width  / 2;
    var centerY = height / 2;
    var r = 0.8*(width/2);

    /*
     i: count of axis
     func: Math.cos or Math.sin
     */
    function getPosition(i, r, func) {
	var rad = i/labels.length * 2*Math.PI;
	return r*func(rad - Math.PI/2);
    }
    function getPositionX(i, r){return centerX + getPosition(i, r, Math.cos);}
    function getPositionY(i, r){return centerY + getPosition(i, r, Math.sin);}

    // var maxValue = Math.max.apply(null, Array.prototype.concat.apply([], data));

    // svg
    var svg = d3.select('div.chart')
	    .append('svg')
	    .attr('width', width)
	    .attr('height', height);
    svg.append("circle")
	.attr("cx", centerX)
	.attr("cy", centerY)
	.attr("r", r)
    	.style("stroke", "black")
        .style("fill", "gray")
	.style("opacity", 0.333);

    // axis
    svg.selectAll("line")
	.data(labels)
	.enter().append("line")
    	.attr("x1", function(d, i){return width/2;})
	.attr("y1", function(d, i){return height/2;})
	.attr("x2", function(d, i){return getPositionX(i, r);})
	.attr("y2", function(d, i){return getPositionY(i, r);})
	.style("stroke", "gray");
    // axis label
    svg.selectAll("text")
	.data(labels)
	.enter().append("text")
    	.text(function(d){return d;})
    	.attr("text-anchor", "middle")
    	.attr("x", function(d, i){return getPositionX(i, 1.1*r);})
    	.attr("y", function(d, i){return getPositionY(i, 1.1*r);});

    // plot data
    var colors =  ["red", "green", "blue"];
    for (var j = data.length-1; 0 <= j; j--) {
	var g = svg.append("g");

	// path
	var line = d3.svg.line()
		.x(function(d, i) { return getPositionX(i, (d/maxValue)*r);})
		.y(function(d, i) { return getPositionY(i, (d/maxValue)*r);})
		.interpolate("linear-closed");
	g.append("path")
	    .attr("d", line(data[j]))
	    .style("stroke", colors[j])
	    .style("stroke-width", 2)
	    .style("fill", colors[j])
	    .style("opacity", 0.5);

	// poitn
	g.selectAll("circle")
    	    .data(data[j])
    	    .enter().append("circle").attr("class", "point")
    	    .attr("cx", function(d, i){return getPositionX(i, (d/maxValue)*r);})
    	    .attr("cy", function(d, i){return getPositionY(i, (d/maxValue)*r);})
    	    .attr("r", 3)
    	    .style("fill", colors[j]);
    }
}

$(function() {
    var labels = ["1群", "2群", "3群", "4群", "5群", "6群"];
    var data = [[13, 1, 8, 4, 9, 9],
		[13, 7, 9, 10, 9, 9],
		[15, 10, 15, 10, 15, 14]];
    var maxValue = 15;
    
    drawRadarChart(labels, data, maxValue);
});
