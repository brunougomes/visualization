$(function () { 
    var svg = d3.select("#canvas").append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

    var group1 = svg.append("g")
    var group2 = svg.append("g")
    var group3 = svg.append("g")
    var group4 = svg.append("g")

    var originX = 200;
    var originY = 200;

    var innerCircleRadius = 100;
    var outerCircleRadius = 120;

    var chairOriginX = originX + ((outerCircleRadius) * Math.sin(0));
    var chairOriginY = originY - ((outerCircleRadius) * Math.cos(0));

    var circleData = [];
    for (i = 0; i < 10; i++) {
        circleData.push(
            {
                name: "node_" + i,
                id: i,
                coord: []
            }
        )
    }

    

    var table = group1.append("circle").attr({
        cx: originX,
        cy: originY,
        r: innerCircleRadius,
        fill: "white",
        stroke: "black"
    })

    var outerCircle = group1.append("circle").attr({
        cx: originX,
        cy: originY,
        r: outerCircleRadius,
        fill: "none",
        stroke: "black"
    });
    

    var chairWidth = 20;

    var circlePoints = group2.selectAll("circle").data(circleData).enter().append("circle")

    var rectPoints = group3.selectAll("rect").data(circleData).enter().append("rect")

    var rects = rectPoints
        .attr("x", chairOriginX - (chairWidth / 2))
        .attr("y", chairOriginY - (chairWidth / 2))
        .attr("width", chairWidth)
        .attr("height", 20)
        .attr("id", function (d) { return "rect_" + d.name })
        .attr("class", "rectangles")
        .attr("transform", function (d, i) {
            transform = "rotate(" + (360 / circleData.length) * d.id + "," + originX + "," + originY + ")"
            d.coord = d3.transform(transform).translate;
            return transform
        })
        .style("stroke", function (d) {
            var returnColor = "gray";
            return returnColor;
        })
        .style("fill", function (d) {
            var returnColor = "none";
            return returnColor;
        });

    var circlesAtributes = circlePoints
        .attr("cx", chairOriginX)
        .attr("cy", chairOriginY)
        .attr("id", function(d){ return d.name }) 
        .attr("class", "nodes")
        .attr("transform", function (d, i) {
            //point.attr("transform", "rotate(45, 200, 200)");
            transform = "rotate(" + (360 / circleData.length) * d.id + "," + originX + "," + originY + ")"
            d.coord = d3.transform(transform).translate;
            return transform
        })
        .attr("r", function (d) { return 5 })
        .style("fill", function (d) {
            var returnColor = "blue";
            return returnColor;
        });

    //var translate = d3.transform("rotate(0,200,200)").translate;
    
    var links = [
        { source: circleData[0].coord, target: circleData[1].coord },
        { source: circleData[2].coord, target: circleData[1].coord }
    ]

    console.log(links);

    group3.selectAll(".line")
       .data(links)
       .enter()
       .append("line")
       .attr("x1", function (d) { return d.source[0] })
       .attr("y1", function (d) { return d.source[1] })
       .attr("x2", function (d) { return d.target[0] })
       .attr("y2", function (d) { return d.target[1] })
       .style("stroke", "rgb(6,120,155)");

})