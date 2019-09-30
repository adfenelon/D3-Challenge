// @TODO: YOUR CODE HERE!
function BuildBellyButtonMetaData(sample) {
    d3.json(`/metadata/${sample}`).then((data) => {
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");

        Object.entries(data).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
        });

        buildGuage(data.WFREQ);
    });
}

// function Charts(sample) {
//     d3.jason(`/samples/${sample}`).then(data) => {
//         const otu_ids = data.otu_ids;
//         const otu_labels = data.otu_labels;
//         const sample_values = data.sample_values;

//         var bubblechartlayout = {
//             margin: {t:0},
//             hovermode: "closest",
//             xaxis: {title: "OTU ID"}
//         };

        // var bubbleplots = [
        //     {
        //         x: otu_ids,
        //         y: sample_values,
        //         mode: "markers",
        //         marker: {

        //         }
        //     }
        // ]
        
//     };
// };


// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("C:\Users\fenel\D3-Challenge\D3_data_journalism\assets\data", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 10000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([35, 90])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 1, 40]);

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.gdpPercap); } )
      .attr("cy", function (d) { return y(d.lifeExp); } )
      .attr("r", function (d) { return z(d.pop); } )
      .style("fill", "#69b3a2")
      .style("opacity", "0.7")
      .attr("stroke", "black")
      
})