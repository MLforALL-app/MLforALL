import React from "react";
import { firestoreConnect } from "react-redux-firebase";

const examples = () => {
  return (
    <div className="col s12 m6">
      <h5> Example Datasets </h5>
      <ul>
        <li>
          <a href="https://firebasestorage.googleapis.com/v0/b/mlforall-14bf7.appspot.com/o/Examples%2FPokemon.csv?alt=media&token=148e76a0-f9e1-47e7-851c-63935d9cc6ed">
            Pokemon with Stats
          </a>
        </li>
        <li>
          <a href="https://firebasestorage.googleapis.com/v0/b/mlforall-14bf7.appspot.com/o/Examples%2FSpotify2000.csv?alt=media&token=c06b8002-f3db-46d5-8856-3388587373a7">
						Spotify All Time Top 2000s Mega Dataset
          </a>
        </li>
        <li>
          <a href="https://firebasestorage.googleapis.com/v0/b/mlforall-14bf7.appspot.com/o/Examples%2FNBAFantasy2019.csv?alt=media&token=78bc0763-9f51-4799-a7f2-6995924112bc">
            {" "}
            NBA Fantasy Predictions for 2019-2020
          </a>
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
            href="https://www.kaggle.com/datasets"
            rel="noopener noreferrer"
            target="_blank"
          >
            Check out Kaggle,
          </a>
        </li>
        <li>
          <a
            href="https://data.world/"
            rel="noopener noreferrer"
            target="_blank"
          >
            data.world (needs login),
          </a>
        </li>
        <li>
          <a
            href="https://registry.opendata.aws/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Amazon's open registry,
          </a>
        </li>
        <li>
          <a
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
const Guide = () => {
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
        {examples()}
        {findMore()}
      </div>
    </div>
  );
};

export default Guide;
