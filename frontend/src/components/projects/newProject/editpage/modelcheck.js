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
        <div className="card center">
          <div onClick={handleToggle(value)} style={{ height: "12vw" }}>
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
                </div>
                <div
                  style={{
                    fontFamily: "Helvetica",
                    fontStyle: "normal",
                    fontWeight: "normal",
										fontSize: "1vw",
										color: "gray",
										lineHeight: "135%",
										position: "absolute",
										left: "1vw",
										top: "3.5vw",
										textAlign: "left",
										width: "55%"
                  }}
                >
                  {desc[value]}
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
              <div
                className="card-content card-model"
                style={{
                  backgroundImage: `url(${img})`,
                  paddingLeft: "50px",
                  backgroundPosition: "90% 0%",
                  backgroundSize: "7vw 7vw",
                  backgroundRepeat: "no-repeat",
                }}
              >
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
      <div className="row">{modelCards.slice(0, 2)}</div>
      <div className="row">{modelCards.slice(2, 4)}</div>
      <div className="row">{modelCards.slice(4, 6)}</div>
    </div>
  );
};

export default ModelCheck;
