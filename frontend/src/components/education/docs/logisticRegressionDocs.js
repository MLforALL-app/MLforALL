import React from "react"
import {header, bodyContent} from "./fileFormatter"

// {header("Machine Learning Models", "+2")}
const logisticRegression =
<p>
{header("Logistic Regression", "+2")}

{header("What's it for?")}

{bodyContent(`
Used for Binary Classification, i.e. $y\\in\\{0, 1\\}$. (Note that it can be extended to multiple classes)`
)}

{header("How does it work?")}

{bodyContent(`
Uses "sigmoid" or "logistic" function $g(z) = \\frac{1}{1+e^{-z}}$ and fits weights $\\theta = [\\theta_0, \\dots, \\theta_n]^{T}$ to predict $\\hat{y} := h_{\\theta}(x) = g(\\theta^{T}x)$. 
`)}

{header("Why does it work?")}

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

</p>

export default logisticRegression;