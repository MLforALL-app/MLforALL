import React from "react";
import { header, bodyContent } from "./fileFormatter";

const gaussianNaiveBayes = (
    <div>
        {header("Gaussian Naive Bayes", "+2")}

        {header("What's it for?")}

        {bodyContent(`
Multi-class classification, i.e. $y\\in\\{1, 2, \\dots, n\\}$.
`)}

        {header("How does it work?")}

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
