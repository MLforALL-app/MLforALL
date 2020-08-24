import React from "react";
/*
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
*/
import knn from "../../../../pictures/models/knn.svg";
import svm from "../../../../pictures/models/svm.svg";
import log_reg from "../../../../pictures/models/log_reg.svg";
import gnb from "../../../../pictures/models/gnb.svg";
import lda from "../../../../pictures/models/lda.svg";
import clf from "../../../../pictures/models/clf.svg";
import HelpBox from "../../../layouts/helpbox";

const ModelCheck = ({ handleToggle, nameMapper, models }) => {
  const desc = {
    log_reg:
      "Logistic Regression classifies based on class probabilities modeled by logistic function",
    gnb:
      "Gaussian Naive Bayes classifies under assumptions of Gaussian data and independence",
    knn:
      "K Nearest Neighbors classifies based on distance to closest k training examples",
    svm:
      "Support Vector Machines classify by creating maximum margin decision boundaries",
    clf:
      "Decision Trees classify by using consecutive true/false decision rules",
    lda:
      "Linear Discriminant Analysis classifies using Bayes' theorem assuming each class is normally distributed with equal covariance",
  };
  const modelImgs = [
    ["log_reg", log_reg],
    ["knn", knn],
    ["gnb", gnb],
    ["clf", clf],
    ["svm", svm],
    ["lda", lda],
  ];
  const makeCard = (value, img) => {
    return (
      <div key={value} className="col s6 m4">
        <div className="card center">
          <div onClick={handleToggle(value)}>
            {/* The header starts here */}
            {models[value] ? (
              <div className="" style={{ color: "red" }}>
                <div>
                  <b
                    style={{
                      color: "#283593",
                      fontFamily: "Helvetica",
                      fontStyle: "normal",
                      fontWeight: "bold",
                      fontSize: "24px",
                      lineHeight: "135%",
                    }}
                  >
                    {nameMapper(value)}{" "}
                  </b>
                </div>
                <div style={{ float: "right" }}>
                  <HelpBox
                    desc={desc[value]}
                    link="help"
                    linkdesc="Learn more here"
                  />
                </div>
                <div style={{ clear: "both" }}></div>
              </div>
            ) : (
              <div className="">
                <div style={{ float: "left" }}>
                  <b
                    style={{
                      color: "#283593",
                      fontFamily: "Helvetica",
                      fontStyle: "normal",
                      fontWeight: "bold",
                      fontSize: "1.2vw",
                      lineHeight: "135%",
                      position: "relative",
                      top: "1vw",
                      left: "1.2vw",
                    }}
                  >
                    {nameMapper(value)}{" "}
                  </b>
                </div>
                <div
                  style={{
                    float: "right",
                    position: "relative",
                    top: "10px",
                    right: "10px",
                  }}
                >
                  <HelpBox
                    desc={desc[value]}
                    link="help"
                    linkdesc="Learn more here"
                  />
                </div>
                <div style={{ clear: "both" }}></div>
              </div>
            )}
            {/* The header ends here */}
            {models[value] ? (
              <div className="card-content card-model-clicked">
                <img src={img} style={{ width: "25%" }} alt={value}></img>
              </div>
            ) : (
              <div className="card-content card-model">
                <img
                  src={img}
                  style={{
                    width: "25%",
                    position: "relative",
                    left: "35%",
                    top: "15%",
                  }}
                  alt={value}
                ></img>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  const modelCards = modelImgs.map(([value, img]) => makeCard(value, img));

  return (
    <div style={{ paddingTop: "2.5rem" }}>
      <div className="row">{modelCards.slice(0, 3)}</div>
      <div className="row">{modelCards.slice(3, 7)}</div>
    </div>
  );
};

export default ModelCheck;
