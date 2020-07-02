import React from "react";
import { header } from "./fileFormatter";
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
			name: "Yes",
			marker: {
				// marker is an object, valid marker keys: #scatter-marker
				color: "rgb(255, 0, 0)", // more about "marker.color": #scatter-marker-color
				size: 10
			}
		},
		{
			type: "scatter", // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
			mode: "markers",
			x: [4, 4, 5, 6], // more about "x": #scatter-x
			y: [8, 6, 7, 5], // #scatter-y
			name: "No",
			marker: {
				// marker is an object, valid marker keys: #scatter-marker
				color: "rgb(0, 0, 255)", // more about "marker.color": #scatter-marker-color
				size: 10
			}
		},
		{
			type: "scatter",
			x: arange(1, 6, 0.1),
			y: arange(1, 6, 0.1).map(linear_fn(5.5, -0.5)),
			name: "Decision Boundary",
			marker: {
				color: "rgb(0, 0, 0)"
			}
		},
		{
			type: "scatter",
			x: arange(1, 6, 0.1),
			y: arange(1, 6, 0.1).map(linear_fn(3, -0.5)),
			name: "Margin",
			marker: {
				color: "rgb(0, 0, 0)"
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
				color: "rgb(0, 0, 0)"
			},
			line: {
				dash: "dot"
			}
		}
	];
	let layout = {
		// all "layout" attributes: #layout
		title: "Probability of Liking Math Given Number of Math Classes Taken", // more about "layout.title": #layout-title
		xaxis: {
			// all "layout.xaxis" attributes: #layout-xaxis
			title: "Number of Math Classes Taken in College" // more about "layout.xaxis.title": #layout-xaxis-title
		},
		yaxis: {
			title: "Likes Math"
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
		{makePlot()}
	</div>
);

export default supportVectorMachine;
