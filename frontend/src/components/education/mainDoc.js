import React from "react";
import MakeDrawer from "./makeToolBar";
import "../../styling/help.css";
import logisticRegression from "./docs/logisticRegressionDocs";
import kNearestNeighbors from "./docs/kNearestNeighborsDocs";
import gaussianNaiveBayes from "./docs/gaussianNaiveBayesDocs";
import linearDiscriminantAnalysis from "./docs/linearDiscriminantAnalysisDocs";
import supportVectorMachine from "./docs/supportVectorMachineDocs";
import decisionTree from "./docs/decisionTreeDocs";
import additionalResources from "./docs/additionalResourcesDocs";

const MainDoc = () => {
	const logreg = [
		{
			to: "to1",
			text: "Logistic Regression",
			content: logisticRegression
		}
	];
	const knn = [
		{
			to: "to2",
			text: "k-Nearest Neighbors",
			content: kNearestNeighbors
		}
	];
	const gnb = [
		{
			to: "to3",
			text: "Gaussian Naive Bayes",
			content: gaussianNaiveBayes
		}
	];
	const lda = [
		{
			to: "to4",
			text: "Linear Discriminant Analysis",
			content: linearDiscriminantAnalysis
		}
	];
	const svm = [
		{
			to: "to5",
			text: "Support Vector Machine",
			content: supportVectorMachine
		}
	];
	const dt = [
		{
			to: "to6",
			text: "Decision Tree",
			content: decisionTree
		}
	];
	const more = [
		{
			to: "to7",
			text: "Additional Resources",
			content: additionalResources
		}
	];
	return <MakeDrawer sections={[logreg, knn, gnb, lda, svm, dt, more]} />;
};

export default MainDoc;
