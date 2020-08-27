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
import "../../../../styling/build.css";

const ModelCheck = ({ handleToggle, nameMapper, models }) => {
  const desc = {
    log_reg:
      "Estimates the probability that objects belong to different categories based on information about those objects",
    gnb:
      "Supports continuous valued features and models each as conforming to a Gaussian (normal) distribution",
    knn:
      "Classify objects which belong to different categories based on information about those objects and similarity of this information to known examples",
    svm:
      "Finds the decision boundary to separate different classes and maximaze the margin",
    clf:
      'Flowchart-like structure in which each internal node represents a "test" on an attribute and its outcome from the test',
    lda:
      "Estimates the probability that a new set of inputs belongs to every class. The output class is the one that has the highest probability",
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
      <div key={value} className="col s6 m6">
        <div
          className="card center"
          style={
            models[value]
              ? { backgroundColor: "#DCDCDC" }
              : { backgroundColor: "white" }
          }
        >
          <div
            onClick={handleToggle(value)}
            style={{ height: "calc(10rem + 1vw)" }}
          >
            <div>
              <div style={{ float: "left" }}>
                <b className="model-card-name">{nameMapper(value)} </b>
              </div>
              <div className="model-card-name-desc">{desc[value]}</div>
              <div style={{ clear: "both" }}></div>
            </div>
            <div
              className="card-content card-model"
              style={{
                backgroundImage: `url(${img})`,
                paddingLeft: "50px",
                backgroundPosition: "90% 0%",
                backgroundSize: "calc(6.2rem + 0.5vh) calc(6.2rem + 0.5vh)",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  const modelCards = modelImgs.map(([value, img]) => makeCard(value, img));

  return (
    <div style={{ paddingTop: "2.5rem" }}>
      <div className="row">{modelCards.slice(0, 2)}</div>
      <div className="row">{modelCards.slice(2, 4)}</div>
      <div className="row">{modelCards.slice(4, 6)}</div>
    </div>
  );
};

export default ModelCheck;
