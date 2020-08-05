import React from "react";
import "../../../styling/createproject.css";

const examples = (clickHandle) => {
  return (
    <div className="col s12 m6">
      <h5> Example Datasets </h5>
      <ul>
        <li>
          <button
            className="waves-effect waves-light btn-flat example-btns"
            onClick={clickHandle("Pokemon.csv")}
          >
            Pokemon with Stats
          </button>
        </li>
        <li>
          <button
            className="waves-effect waves-light btn-flat example-btns"
            onClick={clickHandle("Spotify2000.csv")}
          >
            Spotify All Time Top 2000s Mega Dataset
          </button>
        </li>
        <li>
          <button
            className="waves-effect waves-light btn-flat example-btns"
            onClick={clickHandle("NBAFantasy2019.csv")}
          >
            {" "}
            NBA Fantasy Predictions for 2019-2020
          </button>
        </li>
      </ul>
    </div>
  );
};

const findMore = () => {
  return (
    <div className="col s12 m6">
      <h5> Other Places To Find </h5>
      <ul>
        <li>
          <a
            className="waves-effect waves-light btn-flat example-btns"
            href="https://www.kaggle.com/datasets"
            rel="noopener noreferrer"
            target="_blank"
          >
            Check out Kaggle,
          </a>
        </li>
        <li>
          <a
            className="waves-effect waves-light btn-flat example-btns"
            href="https://data.world/"
            rel="noopener noreferrer"
            target="_blank"
          >
            data.world (needs login),
          </a>
        </li>
        <li>
          <a
            className="waves-effect waves-light btn-flat example-btns"
            href="https://registry.opendata.aws/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Amazon's open registry,
          </a>
        </li>
        <li>
          <a
            className="waves-effect waves-light btn-flat example-btns"
            href="https://datasetsearch.research.google.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {" "}
            or Google's dataset search engine!
          </a>
        </li>
      </ul>
    </div>
  );
};

const Guide = (props) => {
  const { clickHandle } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h3>
            <span className="purple-text">
              <b>Choosing a Dataset</b>
            </span>
          </h3>
          To get your project started, type in a project name and click
          initialize project. If this is your first project, don't worry! There
          will be plenty of explanation and recourses provided as you get
          started.
        </div>
      </div>
      <div className="row">
        {examples(clickHandle)}
        {findMore()}
      </div>
    </div>
  );
};

export default Guide;
