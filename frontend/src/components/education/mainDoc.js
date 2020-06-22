import React from "react";
import MakeDrawer from "./makeToolBar";
import "../../styling/help.css";
import introduction from "./docs/introductionDocs";
import logisticRegression from "./docs/logisticRegressionDocs";
import kNearestNeighbors from "./docs/kNearestNeighborsDocs";
import gaussianNaiveBayes from "./docs/gaussianNaiveBayesDocs";
import linearDiscriminantAnalysis from "./docs/linearDiscriminantAnalysisDocs";
import supportVectorMachine from "./docs/supportVectorMachineDocs";
import decisionTree from "./docs/decisionTreeDocs";
import additionalResources from "./docs/additionalResourcesDocs";

const MainDoc = () => {
    const intro = [
        {
            to: "to0",
            text: "Help Page",
            preimg: "",
            postimg: "",
            imgurl: "",
            content: introduction,
        },
    ];
    const logreg = [
        {
            to: "to1",
            text: "Logistic Regression",
            preimg: "",
            postimg: "",
            imgurl: "",
            content: logisticRegression,
        },
    ];
    const knn = [
        {
            to: "to2",
            text: "k-Nearest Neighbors",
            preimg: "",
            postimg: "",
            imgurl: "",
            content: kNearestNeighbors,
        },
    ];
    const gnb = [
        {
            to: "to2",
            text: "Gaussian Naive Bayes",
            preimg: "",
            postimg: "",
            imgurl: "",
            content: gaussianNaiveBayes,
        },
    ];
    const lda = [
        {
            to: "to3",
            text: "Linear Discriminant Analysis",
            preimg: "",
            postimg: "",
            imgurl: "",
            content: linearDiscriminantAnalysis,
        },
    ];
    const svm = [
        {
            to: "to4",
            text: "Support Vector Machine",
            preimg: "",
            postimg: "",
            imgurl: "",
            content: supportVectorMachine,
        },
    ];
    const dt = [
        {
            to: "to5",
            text: "Decision Tree",
            preimg: "",
            postimg: "",
            imgurl: "",
            content: decisionTree,
        },
    ];
    const more = [
        {
            to: "to6",
            text: "Additional Resources",
            preimg: "",
            postimg: "",
            imgurl: "",
            content: additionalResources,
        },
    ];
    return (
        <MakeDrawer sections={[intro, logreg, knn, gnb, lda, svm, dt, more]} />
    );
};

export default MainDoc;
