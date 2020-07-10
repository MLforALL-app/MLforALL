import React from "react";
import MathJax from "react-mathjax";
import RemarkMathPlugin from "remark-math";

export function header(str) {
	return <h4 className="purple-text">{str}</h4>;
}

export function bodyContent(str) {
	const ReactMarkdown = require("react-markdown");

	const newProps = {
		...str,
		plugins: [RemarkMathPlugin],
		renderers: {
			...str.renderers,
			math: (str) => <MathJax.Node formula={str.value} />,
			inlineMath: (str) => <MathJax.Node inline formula={str.value} />
		}
	};

	return (
		<MathJax.Provider input="tex">
			<ReactMarkdown source={str} {...newProps} />
		</MathJax.Provider>
	);
}

export const purpleTheme = "#283593";
export const purpleLight = "#7a5eeb";
export const purpleDark = "#261473";
export const pinkTheme = "#f8bbd0";
export const pinkLight = "#ffdbfd";
export const pinkDark = "#cf88cb";
export const grey = "#c7c7c7";
