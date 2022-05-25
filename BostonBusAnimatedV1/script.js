

promises = [

    d3.json("./geojson/MBTA_busroutes.geojson"),
];


Promise.all(promises).then(function (data) {



    const busRoutes = data[0];



    const width = document.querySelector("#chartmassnetwork").clientWidth;
    const height = document.querySelector("#chartmassnetwork").clientHeight;
    const svg = d3.select("#chartmassnetwork")
        .append("svg")
        .attr("width", width)
        .attr("height", height);




    const projection = d3.geoMercator()
        // .translate([width / 1, height / 0.4])
        // .center([-70.821001, 41.9])
        .rotate([71.057, 0])	//use to get map in right spot
        .center([0, 42.313])
        .scale(170000)
    // .scale(142850);

    const busRoutesPath = d3.geoPath()
        .projection(projection);


    console.log(busRoutes)


    var busLines = svg.selectAll("path.busroutes")
        .data(busRoutes.features)
        .enter()
        .append("path")
        .attr("d", busRoutesPath)
        .attr("class", "busroutes")
        // .style("stroke",function (d) { return "rgb" + d.properties.route_color_formatted })
        .style("stroke", "#43b581")
        // .style("stroke-width", 0.15)
        .style("stroke-width", 1)
        .style("stroke-opacity", 0.1)
        .style("fill", "none");



    // var busLines = svg.selectAll("path.busroutes")
    //     .data(busRoutes.features)
    //     .enter()
    //     .append("path")
    //     .attr("d", busRoutesPath)
    //     .attr("class", "busroutes")
    //     .style("stroke", function (d) { return "rgb" + d.properties.route_color_formatted })
    //     // .style("stroke-width", 0.15)
    //     .style("stroke-width", function (d) {
    //         if (d.properties.route_id === "1") {
    //             return 4
    //         } else {
    //             return 0.15
    //         }
    //     })
    //     .style("stroke-opacity", 0.7)
    //     .style("fill", "none");








    var busCircles = svg.selectAll("circle")
        .data(busRoutes.features)
        .enter()
        .append("circle")
        .attr("class", "bus")
        .attr("cx", function (d) {
            return projection(d.geometry.coordinates[0])[0]
        })
        .attr("cy", function (d) {
            return projection(d.geometry.coordinates[0])[1]
        })
        .attr("r", 3)
        .attr("stroke", "orange")
        .attr("stroke-width", 0)
        .attr("stroke-opacity", 1)
        //.attr("fill", function (d) { return "rgb" + d.properties.route_color_formatted })
        .attr("fill", "#faa61a")

    // console.log(busRoutes.features)

    var index = 1


    // moveCircles()
    setInterval(moveCircles, 500)

    // setTimeout(moveCircles, 5000)

    function moveCircles() {

        console.log(index)
        busCircles
            .transition()
            .ease(d3.easeLinear)
            .duration(500)
            .attr("cx", function (d) {
                if (index < d.geometry.coordinates.length) {
                    return projection(d.geometry.coordinates[index])[0]
                } else {
                    // return width/2
                    // return projection(d.geometry.coordinates[0])[0]
                }
            })
            .attr("cy", function (d) {
                if (index < d.geometry.coordinates.length) {
                    return projection(d.geometry.coordinates[index])[1]
                } else {
                    // return height/2
                    // return projection(d.geometry.coordinates[0])[1]
                }
            })
        // .on("end", moveCirclesSlow);


        index = index + 1

        // function moveCirclesSlow(){
        //     setInterval(moveCircles, 6000)
        // }

    }




});