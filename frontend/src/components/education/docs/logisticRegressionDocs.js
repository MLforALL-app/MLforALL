import React from "react";
import { header, bodyContent } from "./fileFormatter";
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

function logistic_fn(beta, c, x) {
	return function (x) {
		return 1.0 / (1.0 + Math.exp(-1 * beta * (x - c)));
	};
}

function makePlot() {
	let data = [
		{
			type: "scatter", // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
			mode: "markers",
			x: arange(3, 6, 1), // more about "x": #scatter-x
			y: [1, 1, 1], // #scatter-y
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
			x: arange(1, 4, 1), // more about "x": #scatter-x
			y: [0, 0, 0], // #scatter-y
			name: "No",
			marker: {
				// marker is an object, valid marker keys: #scatter-marker
				color: "rgb(0, 0, 255)", // more about "marker.color": #scatter-marker-color
				size: 10
			}
		},
		{
			type: "scatter",
			x: arange(0, 7, 0.1),
			y: arange(0, 7, 0.1).map(logistic_fn(3.0, 3)),
			name: "Probability of Liking Math",
			marker: {
				color: "rgb(0, 0, 0)"
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
		paper_bgcolor: "rgba(0, 0, 0, 0)",
		plot_bgcolor: "rgba(0, 0, 0, 0)"
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

const logisticRegression = (
	<div>
		{header("Logistic Regression", "+2")}

		{bodyContent(`
Logistic regression is used to estimate the probability that objects belong to different categories based on information about those objects. For example, we could measure the height and weight of an animal and give the probability that the animal is a dog versus a cat. In the example below, we estimate the probability that a person likes math based on the number of math classes they've taken.     
`)}
		{makePlot()}

		{bodyContent(`
The function above used to estimate the probability of liking math is the "sigmoid" or "logistic" function $g(x) = \\frac{1}{1+e^{-x}}$. During training, the model learns parameters $\\theta_0,\\dots,\\theta_n$ associated with each input variable so that the predicted probability of liking math is 
$$
\\begin{equation}
\\hat{p} = g(\\theta_0 + \\theta_1x_1 + \\dots + \\theta_nx_n)
\\end{equation}
$$

While we're only discussing logistic regression in the context of two possible categories, it can be extended to more than two categories as well.
`)}
		{header("Technical Explanation")}
		{bodyContent(`
Notice that $g(z) \\in (0, 1)$. We want a model where $p(y=1\\mid x; \\theta) = \\hat{y}$. It follows that $p(y=0\\mid x; \\theta) = 1 - \\hat{y}$. Another way of saying this is
$$\\begin{equation}
p(y\\mid x; \\theta) = (\\hat{y})^{y}(1-\\hat{y})^{1-y}
\\end{equation}$$
Now we want to maximize the likelihood of $\\theta$:

$$\\begin{equation}
\\begin{split}
\\mathcal{L}(\\theta) &= p(y\\mid x; \\theta)\\\\
&= \\Pi_{i=1}^{n} p(y^{(i)}\\mid x^{(i)}; \\theta)\\\\
&= \\Pi_{i=1}^{n} (h_{\\theta}(x^{(i)}))^{y^{(i)}}(1-h_{\\theta}(x^{(i)}))^{1-y^{(i)}}
\\end{split}
\\end{equation}$$

Maximizing likelihood is equivalent to maximizing log-likelihood:
$$\\begin{equation}
\\begin{split}
l(\\theta) &= \\log{\\mathcal{L}(\\theta)}\\\\
&= \\sum_{i=1}^{n} y^{(i)}\\log{(h_{\\theta}(x^{(i)}))} + (1-y^{(i)})\\log{(1-h_{\\theta}(x^{(i)}))}\\\\
\\end{split}
\\end{equation}$$
We update $\\theta$ by following the gradient of $l(\\theta)$ using gradient ascent (since we are maximizing the log-likelihood as opposed to gradient descent which is used for minimization):
$$\\begin{equation}
\\theta_j := \\theta_j + \\alpha\\cdot\\frac{\\partial}{\\partial \\theta_j} l(\\theta)
\\end{equation}$$
Here, $\\alpha$ is a learning rate. There are other ways to update weights as well, such as Newton's method. Note that this is a similar update rule to others you may have seen. Check out generalized linear models for more information.
`)}
	</div>
);

export default logisticRegression;
