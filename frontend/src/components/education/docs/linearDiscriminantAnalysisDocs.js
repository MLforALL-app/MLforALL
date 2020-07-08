import React from "react";
import { header, pinkTheme, purpleLight, purpleTheme, bodyContent } from "./fileFormatter";
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
			name: "Probability of Liking Math",
			marker: {
				color: purpleTheme
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

const linearDiscriminantAnalysis = (
	<div>
		{header("Linear Discriminant Analysis", "+2")}
		{bodyContent(`
Linear discriminant analysis (LDA) is used to classify objects into different categories by fitting planes (lines in the example below) which separate the categories. It assumes that the data associated with each class is normally distributed but that class covariances (variance in one dimension) are the same between different classes. Here, we predict animal type based on height and weight:
`)}
		{makePlot()}
		{bodyContent(`
In this example, anything above the line would be classified as a dog, while anything below the line would be classified as a cat. Note that LDA works best with continuous data because we assume normality of data associated with each class, and the normal distribution is continuous.
`)}
	</div>
);

export default linearDiscriminantAnalysis;
