function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    let chartData = data.samples;
    console.log(chartData);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let filterSample = chartData.filter(objectID => objectID.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    let firstSample = filterSample[0];
    console.log(firstSample);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIDs = firstSample.otu_ids;
    var otuLabels = firstSample.otu_labels;
    var sampleValues = firstSample.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otuIDs.slice(0,10).map(x=> "OTU "+x);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sampleValues,
      y: yticks,
      text: otuLabels,
      type: "bar",
      orientation: "h"
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      yaxis: {autorange:'reversed'}
    };
//     // 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot("bar", barData, barLayout);
//   });
// }
// // Bar and Bubble charts
// // Create the buildCharts function.
// function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    // Plotly.newPlot("bar", barData, barLayout);

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {color: otuIDs, size: sampleValues}
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU IDs"},
      height: 550
    };

    // 3. Use Plotly to plot the data with the layout.
    // Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
//Guage Chart Code
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    let metaGauge = data.metadata;
    let filterGauge = metaGauge.filter(objectID => objectID.id == sample);
    // 2. Create a variable that holds the first sample in the metadata array.
    let firstGuage = filterGauge[0];
    // 3. Create a variable that holds the washing frequency.
      let washFreq = firstGuage.wfreq;

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("bar", barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      type: "indicator",
      mode:"gauge+number",
      title: "Scrubs per Week",
      value: washFreq,
      gauge: {
        axis: {range: [null, 10]},
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "limegreen"},
          {range: [8,10], color: "green"}
        ]}
  }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     title: "Belly Button Washing Frequency",
     width: 550, height: 550
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}