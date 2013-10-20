function drawRadarChart(data) {
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
	var rad = i/valueList.length * 2*Math.PI;
	return r*func(rad - Math.PI/2);
    }
    function getPositionX(i, r){return centerX + getPosition(i, r, Math.cos);}
    function getPositionY(i, r){return centerY + getPosition(i, r, Math.sin);}

    var axisList = data.map(function(d){return d.axis;});
    var valueList = data.map(function(d){return d.value;});
    var maxValue = Math.max.apply(null, valueList);


    // svg
    var svg = d3.select('div.chart')
	    .append('svg')
	    .attr('width', width)
	    .attr('height', height);

    // memo: n loop
    // around
    // var aroundLine = d3.svg.line()
    // 	    .x(function(d, i) { return getPositionX(i, r);})
    // 	    .y(function(d, i) { return getPositionY(i, r);})
    // 	    .interpolate("linear-closed");
    // var around = svg.append("path")
    // 	    .attr("d", aroundLine(data))
    // 	    .style("stroke", "black")
    // 	    .style("fill", "none");
    var around = svg.append("circle")
	    .attr("cx", centerX)
	    .attr("cy", centerY)
	    .attr("r", r)
    	    .style("stroke", "black")
            .style("fill", "gray")
	    .style("opacity", 0.333);

    // axis
    var axis = svg.selectAll("line")
	    .data(axisList)
	    .enter().append("line")
    	    .attr("x1", function(d, i){return width/2;})
	    .attr("y1", function(d, i){return height/2;})
	    .attr("x2", function(d, i){return getPositionX(i, r);})
	    .attr("y2", function(d, i){return getPositionY(i, r);})
	    .style("stroke", "gray");
    // axis label
    var axisLabel = svg.selectAll("a")
    	    .data(data)
    	    .enter().append("a")
	    .attr("class", "label")
	    .attr("xlink:href", function(d){return d.url;})
	    .append("text")
    	    .text(function(d){return d.axis;})
    	    .attr("text-anchor", "middle")
    	    .attr("x", function(d, i){return getPositionX(i, 1.1*r);})
    	    .attr("y", function(d, i){return getPositionY(i, 1.1*r);});

    // path
    var line = d3.svg.line()
            .x(function(d, i) { return getPositionX(i, (d.value/maxValue)*r);})
            .y(function(d, i) { return getPositionY(i, (d.value/maxValue)*r);})
            .interpolate("linear-closed");
    var valueGraph = svg.append("path")
            .attr("d", line(data))
            .style("stroke", "blue")
            .style("stroke-width", 2)
            .style("fill", "blue")
	    .style("opacity", 0.5);

    // point
    var point = svg.selectAll("circle.point")
    	    .data(data)
    	    .enter().append("circle").attr("class", "point")
    	    .attr("cx", function(d, i){return getPositionX(i, (d.value/maxValue)*r);})
    	    .attr("cy", function(d, i){return getPositionY(i, (d.value/maxValue)*r);})
    	    .attr("r", 3)
    	    .style("fill", "blue");
}

$(function() {
    var data = [
        {axis: "1群", value: 13, url: "http://www.google.com"}, 
        {axis: "2群", value: 1 , url: "http://amateras.wsd.kutc.kansai-u.ac.jp"}, 
        {axis: "3群", value: 8 , url: "http://amateras.wsd.kutc.kansai-u.ac.jp/hiki"},  
        {axis: "4群", value: 4 , url: "http://amateras.wsd.kutc.kansai-u.ac.jp/yp"},
        {axis: "5群", value: 9 , url: "http://www.kansai-u.ac.jp/index.html"},
        {axis: "6群", value: 9 , url: "http://www.kansai-u.ac.jp/Fc_inf/"}
    ];

    drawRadarChart(data);
});
