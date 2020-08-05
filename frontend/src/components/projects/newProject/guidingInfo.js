import React from "react";

const examples = (clickHandle) => {
  return (
    <div className="col s12 m6">
      <h5> Example Datasets </h5>
      <ul>
        <li>
          <button
            className="waves-effect waves-light btn-flat"
            onClick={clickHandle("Pokemon.csv")}
            style={{ color: "#283593" }}
          >
            Pokemon with Stats
          </button>
        </li>
        <li>
          <button
            className="waves-effect waves-light btn-flat"
            onClick={clickHandle("Spotify2000.csv")}
            style={{ color: "#283593" }}
          >
            Spotify All Time Top 2000s Mega Dataset
          </button>
        </li>
        <li>
          <button
            className="waves-effect waves-light btn-flat"
            onClick={clickHandle("NBAFantasy2019.csv")}
            style={{ color: "#283593" }}
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
            className="waves-effect waves-light btn-flat"
            href="https://www.kaggle.com/datasets"
            rel="noopener noreferrer"
            target="_blank"
            style={{ color: "#283593" }}
          >
            Check out Kaggle,
          </a>
        </li>
        <li>
          <a
            className="waves-effect waves-light btn-flat"
            href="https://data.world/"
            rel="noopener noreferrer"
            target="_blank"
            style={{ color: "#283593" }}
          >
            data.world (needs login),
          </a>
        </li>
        <li>
          <a
            className="waves-effect waves-light btn-flat"
            href="https://registry.opendata.aws/"
            rel="noopener noreferrer"
            target="_blank"
            style={{ color: "#283593" }}
          >
            Amazon's open registry,
          </a>
        </li>
        <li>
          <a
            className="waves-effect waves-light btn-flat"
            href="https://datasetsearch.research.google.com/"
            rel="noopener noreferrer"
            target="_blank"
            style={{ color: "#283593" }}
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
