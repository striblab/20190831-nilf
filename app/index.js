/**
 * Main JS file for project.
 */

// Define globals that are added through the js.globals in
// the config.json file, here, mostly so linting won't get triggered
// and its a good queue of what is available:
// /* global _ */

// Dependencies
import utils from './shared/utils.js';

// Mark page with note about development or staging
utils.environmentNoting();



// Adding dependencies
// ---------------------------------
// Import local ES6 or CommonJS modules like this:
// import utilsFn from './shared/utils.js';
//
// Or import libraries installed with npm like this:
// import module from 'module';

// Adding Svelte templates in the client
// ---------------------------------
// We can bring in the same Svelte templates that we use
// to render the HTML into the client for interactivity.  The key
// part is that we need to have similar data.
//
// First, import the template.  This is the main one, and will
// include any other templates used in the project.
// import Content from '../templates/_index-content.svelte.html';
//
// Get the data parts that are needed.  There are two ways to do this.
// If you are using the buildData function to get data, then ?
//
// 1. For smaller datasets, just import them like other files.
// import content from '../assets/data/content.json';
//
// 2. For larger data points, utilize window.fetch.
// let content = await (await window.fetch('../assets/data/content.json')).json();
//
// Once you have your data, use it like a Svelte component:
//
// const app = new Content({
//   target: document.querySelector('.article-lcd-body-content'),
//   data: {
//     content
//   }
// });

import 'intersection-observer';
import jsonData from '../sources/nilf.json';
import us from '../sources/us_counties.json';
import st from '../sources/us_states_topo.json';
import * as d3 from 'd3';
import * as topojson from 'topojson';

    var data = jsonData.counties;

    var aspect = 800 / 500,
        chart = $("#country svg");

    $(window).on("resize", function() {
        var targetWidth = chart.parent().width();
        chart.attr("width", targetWidth);
        chart.attr("height", targetWidth / aspect);
    });

    function mapColor(d, subject, dataCompare) {
        for (var i = 0; i < dataCompare.length; i++) {
            if (Number(d.properties.GEOID) == Number(dataCompare[i].Id2)) {
                var points = dataCompare[i].Bucket;
                var color_scale = d3.scaleLinear().domain([4, 3, 2, 1]).range(['#D1E6E1', '#67B4C2', '#3580A3', '#0D4673']);
                return color_scale(points);
            }
        }
        return "#fff";
    }

    function mapTips(d, subject, dataCompare) {
        for (var i = 0; i < data.length; i++) {
            if (Number(d.properties.GEOID) == Number(dataCompare[i].Id2)) {
                var points = dataCompare[i].Bucket;
                var pct = dataCompare[i].PctNILF;
                var color_scale = d3.scaleLinear().domain([4, 3, 2, 1]).range(['#D1E6E1', '#67B4C2', '#3580A3', '#0D4673']);
                return "<div class='countyName'>" + dataCompare[i].Geography + "</div><div class='number'><span class='legendary' style='background-color:" + color_scale(points) + ";'>" + d3.format(".0%")(pct) + "</span> of middle-aged men not in labor force</div>"
            }
        }
    }

    function mapBuild(container, boxContainer, chartContainer, shape, race, geo, dataCompare, index, visible) {

        var tooltip = function(accessor) {
            return function(selection) {
                var tooltipDiv;
                var bodyNode = d3.select('body').node();
                selection.on("mouseover", function(d, i) {
                        // Clean up lost tooltips
                        d3.select('body').selectAll('div.tooltip').remove();
                        // Append tooltip
                        tooltipDiv = d3.select('body').append('div').attr('class', 'tooltip');
                        var absoluteMousePos = d3.mouse(bodyNode);
                        tooltipDiv.style('left', (absoluteMousePos[0] + 10) + 'px')
                            .style('top', (absoluteMousePos[1] - 15) + 'px')
                            .style('position', 'absolute')
                            .style('z-index', 1001);
                        // Add text using the accessor function
                        var tooltipText = accessor(d, i) || '';
                        // Crop text arbitrarily
                        //tooltipDiv.style('width', function(d, i){return (tooltipText.length > 80) ? '300px' : null;})
                        //    .html(tooltipText);
                    })
                    .on('mousemove', function(d, i) {
                        // Move tooltip
                        var absoluteMousePos = d3.mouse(bodyNode);
                        tooltipDiv.style('left', (absoluteMousePos[0] + 10) + 'px')
                            .style('top', (absoluteMousePos[1] - 15) + 'px');
                        var tooltipText = accessor(d, i) || '';
                        tooltipDiv.html(tooltipText);
                    })
                    .on("mouseout", function(d, i) {
                        // Remove tooltip
                        tooltipDiv.remove();
                    });

            };
        };

        if (geo == "country") {
            var width = 800,
                height = 500,
                centered;
            var projection = d3.geoAlbers().scale(1000).translate([400, 260]);
        } else if (geo == "us") {
            var width = 800,
                height = 500,
                centered;
            var projection = d3.geoAlbers().scale(2000).translate([330, 430]);
        } else if (geo == "mn") {
            var width = 350,
                height = 500,
                centered;
            var projection = d3.geoAlbers().scale(5037).translate([50, 970]);
        } else if (geo == "metro") {
            var width = 350,
                height = 350,
                centered;
            var projection = d3.geoMercator().scale([16500]).center([-92.403259, 44.988113]);
        }

        var path = d3.geoPath()
            .projection(projection);

        var svg = d3.select(container + " svg")
            .attr("width", width)
            .attr("height", height);

        svg.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height);

        var g = svg.append("g");

                var marks = [{
                    long: -93.266667,
                    lat: 44.983333,
                    name: "Minneapolis"
                }, {
                    long: -74.0059,
                    lat: 40.7127,
                    name: "New York"
                }, {
                    long: -122.416667,
                    lat: 37.783333,
                    name: "San Francisco"
                }, {
                    long: -87.955833,
                    lat: 43.052222,
                    name: "Milwaukee"
                }, {
                    long: -87.684722,
                    lat: 41.836944,
                    name: "Chicago"
                }, {
                    long: -93.620833,
                    lat: 41.590833,
                    name: "Des Moines"
                }, {
                    long: -83.045833,
                    lat: 42.331389,
                    name: "Detroit"
                }, {
                    long: -86.15,
                    lat: 39.766667,
                    name: "Indiana"
                }, {
                    long: -96.731667,
                    lat: 43.536389,
                    name: "Sioux Falls"
                }, {
                    long: -118.25,
                    lat: 34.05,
                    name: "Los Angeles"
                }, {
                    long: -80.208889,
                    lat: 25.775278,
                    name: "Miami"
                }, {
                    long: -95.383056,
                    lat: 29.762778,
                    name: "Houston"
                }, {
                    long: -96.796667,
                    lat: 32.775833,
                    name: "Dallas"
                }, {
                    long: -71.063611,
                    lat: 42.358056,
                    name: "Boston"
                }];

                g.append("g")
                    .attr("class", "states")
                    .selectAll("path")
                    .data(us.features)
                    .enter().append("path")
                    .attr("d", path)
                    // .on("click", clicked)
                    .attr("id", function(d) {
                        var str = d.properties.NAME + "" + d.properties.GEOID + "_" + geo;
                        return str.replace(new RegExp(" ", "g"), "-");
                    })
                    .style("fill", function(d) {
                        return mapColor(d, race, dataCompare);
                    })
                    .on("mousedown", function(d, i) {

                    })
                    .style("stroke-width", ".5px")
                    .style("stroke", "#fff")
                    .call(tooltip(function(d, i) {
                        return mapTips(d, race, dataCompare);
                    }));

                g.append("path")
                    //.datum(topojson.mesh(us, us.features, function(a, b) { return a !== b; }))
                    .attr("id", "state-borders")
                    .attr("d", path);

                // svg.selectAll("circle")
                //   .data(marks)
                //   .enter()
                //   .append("circle")
                //   .attr('class','mark')
                //   .attr('width', 10)
                //   .attr('height', 10)
                //   .attr("r", "1.3px")
                //   .attr("fill", "#333")
                //   .attr("transform", function(d) {return "translate(" + projection([d.long,d.lat]) + ")";});

                // svg.insert("path", ".graticule")
                //   .datum(topojson.mesh(st, st.objects.us_states, function(a, b) { return a !== b; }))
                //   .attr("class", "state-boundary")
                //   .style("stroke-width", "1.2px")
                //   .attr("d", path);

                // svg.selectAll("text")
                //   .data(marks)
                //   .enter()
                //   .append("text")
                //   .attr('class','city-label')
                //   .attr("transform", function(d) {return "translate(" + projection([d.long+.23,d.lat-.09]) + ")";})
                //   .text(function(d) { return " " + d.name; });


        var zoom = d3.zoom()
            .on("zoom", function() {
                g.attr("transform", "translate(" +
                    d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
                g.selectAll("circle")
                    .attr("d", path.projection(projection));
                g.selectAll("path")
                    .attr("d", path.projection(projection));

            });

        $(".zoom").click(function() {
            clicked2();
            $('#filter input').val("");
            $("#districtName").html("Midwest");
            $(".district").removeClass("selected");
            $('.card, .card div').show();
        });

        function clicked(d) {
            var x, y, k;

            if (d && centered !== d) {
                var centroid = path.centroid(d);
                x = centroid[0];
                y = centroid[1];
                k = 6;
                centered = d;
            } else {
                x = width / 2;
                y = height / 2;
                k = 3;
                centered = null;
            }

            g.selectAll("path")
                .classed("faded", true)
                .classed("active", centered && function(d) {
                    return d === centered;
                });

            g.transition()
                .duration(750)
                // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1.5 / k + "px");
        }

        function clicked2(d) {
            var x, y, k;

            if (d && centered !== d) {
                var centroid = path.centroid(d);
                x = centroid[0];
                y = centroid[1];
                k = 1;
                centered = d;
            } else {
                x = width / 2;
                y = height / 2;
                k = 1;
                centered = null;
            }

            g.selectAll("path")
                .classed("faded", false)
                .classed("active", centered && function(d) {
                    return d === centered;
                });

            g.transition()
                .duration(750)
                // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
                .style("stroke-width", 1.5 / k + "px");
        }

    }

    mapBuild("#country", "#districtName", "#chart", "us_counties.json", "labor", "country", data, 2, 1);

    var targetWidth = chart.parent().width();
    chart.attr("width", targetWidth);
    chart.attr("height", targetWidth / aspect);