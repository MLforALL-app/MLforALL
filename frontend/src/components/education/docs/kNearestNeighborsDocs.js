import React from "react";
import { header, bodyContent } from "./fileFormatter";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";
const PlotlyComponent = createPlotlyComponent(Plotly);

function makePlot() {
    let data = [
        {
            type: "scatter", // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
            mode: "markers",
            x: [1,2,2,3,4], // more about "x": #scatter-x
            y: [3,1,4,3.5], // #scatter-y
            name: "Cat",
            marker: {
                // marker is an object, valid marker keys: #scatter-marker
                color: "rgb(255, 0, 0)", // more about "marker.color": #scatter-marker-color
                size: 10,
            },
        },
        {
          type: "scatter", // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
          mode: "markers",
          x: [4,4,5,6], // more about "x": #scatter-x
          y: [10,8,9,7], // #scatter-y
          name: "Wolf",
          marker: {
              // marker is an object, valid marker keys: #scatter-marker
              color: "rgb(0, 0, 255)", // more about "marker.color": #scatter-marker-color
              size: 10,
          },
        },
        {
            type: "scatter", // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
            mode: "markers",
            x: [4,4,5,6], // more about "x": #scatter-x
            y: [6,5,6,5], // #scatter-y
            name: "Dog",
            marker: {
                // marker is an object, valid marker keys: #scatter-marker
                color: "rgb(0, 255, 0)", // more about "marker.color": #scatter-marker-color
                size: 10,
            },
        },
        {
            type: "scatter", // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
            mode: "markers",
            x: [2.5], // more about "x": #scatter-x
            y: [2], // #scatter-y
            name: "Unknown",
            marker: {
                // marker is an object, valid marker keys: #scatter-marker
                color: "rgb(0, 0, 0)", // more about "marker.color": #scatter-marker-color
                size: 10,
            },
          },
    ];
    let layout = {
        // all "layout" attributes: #layout
        title: "Animal Type by Weight and Length", // more about "layout.title": #layout-title
        xaxis: {
            showticklabels: false,
            // all "layout.xaxis" attributes: #layout-xaxis
            title: "Length", // more about "layout.xaxis.title": #layout-xaxis-title
        },
        yaxis: {
          showticklabels: false,
          title: "Weight",
        },
        legend: {
          bgcolor: "rgba(0, 0, 0, 0)",
        },
        paper_bgcolor: "rgba(0, 0, 0, 0)",
        plot_bgcolor: "rgba(0, 0, 0, 0)",
    };
    let config = {
        showLink: false,
        displayModeBar: false,
    };
    return (
        <PlotlyComponent
            className="whatever"
            data={data}
            layout={layout}
            config={config}
        />
    );
}

const kNearestNeighbors = (
    <div>
        {header("k-Nearest Neighbors", "+2")}

        {bodyContent(`
$k$-nearest neighbors is used to classify objects which belong to different categories based on information about those objects and similarity of this information to known examples. For example, we could measure the height and weight of an animal, and if the height and weight look like those of a dog, we guess that the animal is a dog. In the example below, we mimic this idea.
`)}

        {makePlot()}

        {bodyContent(`
So to classify the unknown example, we look at the $k$ "closest" known examples and take our prediction is some function of those closest known examples (often a majority vote). If $k=2$ in this case, we would classify the unknown example as a cat.        
`)}
        {header("Technical Explanation")}
        {bodyContent(`
The model is trained on the set of examples $\\{(X^{(1)}, Y^{(1)}), \\dots, (X^{(n)}, Y^{(n)})\\}$ where $X^{(i)}$ is a feature vector and $Y^{(i)}\\in\\{1, 2, \\dots, n\\}$ is the label for example $i$. 

Let $\\lVert X_{new} - X^{(i)} \\rVert$ be the "distance" (e.g. the $l^{2}$ norm) between a new observation and the $i$th training example. Then sort the training examples from least to greatest with respect to this distance from the new observation. The predicted label for $X_{new}$ is the majority vote label for the first $k$ examples in the sorted list of training examples.
`)}
    </div>
);

export default kNearestNeighbors;
