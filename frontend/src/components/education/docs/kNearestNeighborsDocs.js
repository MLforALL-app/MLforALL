import React from "react";
import { header, bodyContent } from "./fileFormatter";

const kNearestNeighbors = (
    <div>
        {header("k-Nearest Neighbors", "+2")}

        {header("What's it for?")}

        {bodyContent(`
Multi-class classification, i.e. $y\\in\\{1, 2, \\dots, n\\}$.
`)}

        {header("How does it work?")}

        {bodyContent(`
The model is trained on the set of examples $\\{(X^{(1)}, Y^{(1)}), \\dots, (X^{(n)}, Y^{(n)})\\}$ where $X^{(i)}$ is a feature vector and $Y^{(i)}\\in\\{1, 2, \\dots, n\\}$ is the label for example $i$. 

Let $\\lVert X_{new} - X^{(i)} \\rVert$ be the "distance" (e.g. the $l^{2}$ norm) between a new observation and the $i$th training example. Then sort the training examples from least to greatest with respect to this distance from the new observation. The predicted label for $X_{new}$ is the majority vote label for the first $k$ examples in the sorted list of training examples.
`)}
    </div>
);

export default kNearestNeighbors;
