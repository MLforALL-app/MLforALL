import React from "react";
import MakeDrawer from "./makeToolBar";
import logisticRegression from "./docs/logisticRegressionDocs";
import kNearestNeighbors from "./docs/kNearestNeighborsDocs";
import gaussianNaiveBayes from "./docs/gaussianNaiveBayesDocs";
import linearDiscriminantAnalysis from "./docs/linearDiscriminantAnalysisDocs";
import supportVectorMachine from "./docs/supportVectorMachineDocs";
import decisionTree from "./docs/decisionTreeDocs";
import additionalResources from "./docs/additionalResourcesDocs";
import { introduction, contactUs } from "./docs/intro";

const MainDoc = () => {
  const intro = {
    to: "to01",
    text: "Introduction",
    content: introduction,
  };
  const contact = {
    to: "to02",
    text: "Help Us Improve",
    content: contactUs,
  };
  const logreg = {
    to: "to1",
    text: "Logistic Regression",
    content: logisticRegression,
  };
  const knn = {
    to: "to2",
    text: "k-Nearest Neighbors",
    content: kNearestNeighbors,
  };
  const gnb = {
    to: "to3",
    text: "Gaussian Naive Bayes",
    content: gaussianNaiveBayes,
  };
  const lda = {
    to: "to4",
    text: "Linear Discriminant Analysis",
    content: linearDiscriminantAnalysis,
  };
  const svm = {
    to: "to5",
    text: "Support Vector Machine",
    content: supportVectorMachine,
  };
  const dt = {
    to: "to6",
    text: "Decision Tree",
    content: decisionTree,
  };
  const more = {
    to: "to7",
    text: "Additional Resources",
    content: additionalResources,
  };
  const section0 = {
    header: "Help Page",
    list: [intro, contact],
  };
  const section1 = {
    header: "Machine Learning Models",
    list: [logreg, knn, gnb],
  };
  const section2 = {
    header: "ML Models pt2",
    list: [lda, svm, dt, more],
  };
  return <MakeDrawer sections={[section0, section1, section2]} />;
};

export default MainDoc;
