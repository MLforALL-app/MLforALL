import React from "react";
import { header, bodyContent } from "./fileFormatter";

const decisionTree = (
    <div>
        {header("Decision Tree (Classifier)", "+2")}

        {header("What's it for?")}

        {bodyContent(``)}

        {header("How does it work?")}

        {bodyContent(``)}

        {header("Why does it work?")}

        {bodyContent(``)}
    </div>
);

export default decisionTree;
