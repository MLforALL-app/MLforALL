import React from "react";
import { header, bodyContent, pinkTheme, purpleLight } from "./fileFormatter";
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

function gaussian_density_fn(mu, sig2, x) {
	return function (x) {
		return (
			(1.0 / Math.sqrt(2 * Math.PI * sig2)) *
			Math.exp((-1 / (2 * sig2)) * (x - mu) * (x - mu))
		);
	};
}

function makePlot() {
	let data = [
		{
			type: "scatter",
			x: arange(0, 7, 0.1),
			y: arange(0, 7, 0.1).map(gaussian_density_fn(3, 0.2)),
			name: "Female",
			marker: {
				color: pinkTheme
			}
		},
		{
			type: "scatter",
			x: arange(0, 7, 0.1),
			y: arange(0, 7, 0.1).map(gaussian_density_fn(5, 0.3)),
			name: "Male",
			marker: {
				color: purpleLight
			}
		}
	];
	let layout = {
		// all "layout" attributes: #layout
		title: "Male/Female Height Distributions", // more about "layout.title": #layout-title
		xaxis: {
			showticklabels: false,
			// all "layout.xaxis" attributes: #layout-xaxis
			title: "Height" // more about "layout.xaxis.title": #layout-xaxis-title
		},
		yaxis: {
			title: "Probability (Density) of Being That Height"
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

const gaussianNaiveBayes = (
	<div>
		{header("Gaussian Naive Bayes")}
		{makePlot()}

		{header("Technical Explanation")}

		{bodyContent(`
Let $x = (x_1, \\dots, x_n)$ be feature vector with label $y$.
From Bayes' theorem, we have
$$\\begin{equation*}
    Pr(y\\mid x_1, \\dots, x_n) = \\frac{Pr(y)\\cdot Pr(x_1, \\dots, x_n\\mid y)}{Pr(x_1, \\dots, x_n)}
\\end{equation*}$$
Now we make an assumption of independence:
$$\\begin{equation*}
    Pr(x_i\\mid y, x_1, \\dots, x_{i-1}, x_{i+1}, \\dots, x_n) = Pr(x_i\\mid y)
\\end{equation*}$$
for all $i$. Using this assumption, we expand the expression in Bayes' theorem to get
$$\\begin{equation*}
    Pr(y\\mid x_1, \\dots, x_n) = \\frac{Pr(y)\\cdot \\Pi_{i=1}^n Pr(x_i\\mid y)}{Pr(x_1, \\dots, x_n)}
\\end{equation*}$$
or equivalently,
$$\\begin{equation*}
    Pr(y\\mid x_1, \\dots, x_n) \\propto Pr(y)\\cdot \\Pi_{i=1}^n Pr(x_i\\mid y)
\\end{equation*}$$
so that our estimate of the class is
$$\\begin{equation*}
    \\hat{y} = \\arg\\max_{y} Pr(y)\\cdot \\Pi_{i=1}^n Pr(x_i\\mid y)
\\end{equation*}$$
In Gaussian Naive Bayes, we assume $Pr(x_i\\mid y)\\sim \\mathcal{N}(\\mu_y, \\sigma_y^2)$ where $\\mu_y$ and $\\sigma_y^2$ are estimated using maximum likelihood estimation.
`)}
	</div>
);

export default gaussianNaiveBayes;
