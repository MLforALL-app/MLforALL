import React from "react";
import { header, purpleTheme, purpleLight, pinkTheme, bodyContent } from "./fileFormatter";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";
const PlotlyComponent = createPlotlyComponent(Plotly);

function arange(start, end, step) {
	var arr = [];
	for (var i = start; i < end; i += step) {
		arr.push(i);
	}
	return arr;
}

function linear_fn(beta0, beta1, x) {
	return function (x) {
		return beta0 + beta1 * x;
	};
}

function makePlot() {
	let data = [
		{
			type: "scatter", // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
			mode: "markers",
			x: [1, 2, 2, 3, 4], // more about "x": #scatter-x
			y: [1, -1, 2, 1.5], // #scatter-y
			name: "Cat",
			marker: {
				// marker is an object, valid marker keys: #scatter-marker
				color: pinkTheme, // more about "marker.color": #scatter-marker-color
				size: 10
			}
		},
		{
			type: "scatter", // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
			mode: "markers",
			x: [4, 4, 5, 6], // more about "x": #scatter-x
			y: [8, 6, 7, 5], // #scatter-y
			name: "Dog",
			marker: {
				// marker is an object, valid marker keys: #scatter-marker
				color: purpleLight, // more about "marker.color": #scatter-marker-color
				size: 10
			}
		},
		{
			type: "scatter",
			x: arange(1, 6, 0.1),
			y: arange(1, 6, 0.1).map(linear_fn(5.5, -0.5)),
			name: "Decision Boundary",
			marker: {
				color: purpleTheme
			}
		},
		{
			type: "scatter",
			x: arange(1, 6, 0.1),
			y: arange(1, 6, 0.1).map(linear_fn(3, -0.5)),
			name: "Margin",
			marker: {
				color: purpleTheme
			},
			line: {
				dash: "dot"
			}
		},
		{
			type: "scatter",
			x: arange(1, 6, 0.1),
			y: arange(1, 6, 0.1).map(linear_fn(8, -0.5)),
			showlegend: false,
			marker: {
				color: purpleTheme
			},
			line: {
				dash: "dot"
			}
		}
	];
	let layout = {
		// all "layout" attributes: #layout
		title: "Animal Type by Weight and Length", // more about "layout.title": #layout-title
		xaxis: {
			// all "layout.xaxis" attributes: #layout-xaxis
			title: "Length" // more about "layout.xaxis.title": #layout-xaxis-title
		},
		yaxis: {
			title: "Weight"
		},
		legend: {
			bgcolor: "rgba(0, 0, 0, 0)"
		},
		paper_bgcolor: "rgb(0, 0, 0, 0)",
		plot_bgcolor: "rgb(0, 0, 0, 0)"
	};
	let config = {
		showLink: false,
		displayModeBar: false
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

const supportVectorMachine = (
	<div>
		{header("Support Vector Machine (Classifier)", "+2")}
		{bodyContent(`
A support vector machine (SVM) classifies objects into different categories by fitting planes which separate the categories. This plane is chosen to be such that the distance from the plane to each class is maximal. We use an SVM to predict animal type from weight and length below:
`)}
		{makePlot()}
		{bodyContent(`
Any data which falls above the decision boundary would be classified as a dog, while any data which falls below the line would be classified as a cat. Note that the margin, shown parallel to the decision boundary, is as big as it can be. In other words, the distance from the dog examples to the boundary and the cat examples to the boundary is as big as possible.
`)}
	</div>
);

export default supportVectorMachine;
