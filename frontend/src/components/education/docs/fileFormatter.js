import React from "react";
import MathJax from "react-mathjax";
import RemarkMathPlugin from "remark-math";

const header = (str, size) => {
    return (
        <font size={size}>
            <b>{str}</b>
            <br />
        </font>
    );
};

const bodyContent = (str) => {
    const ReactMarkdown = require("react-markdown");

    const newProps = {
        ...str,
        plugins: [RemarkMathPlugin],
        renderers: {
            ...str.renderers,
            math: (str) => <MathJax.Node formula={str.value} />,
            inlineMath: (str) => <MathJax.Node inline formula={str.value} />,
        },
    };

    return (
        <MathJax.Provider input="tex">
            <ReactMarkdown source={str} {...newProps} />
        </MathJax.Provider>
    );
};

export { bodyContent, header };
export default header;
