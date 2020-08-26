import React from "react";
import "../../../styling/createproject.css";
import buttonPic from "../../../pictures/project/example-button-picture.png";

const examples = (clickHandle) => {
  return (
    <div className="row center" style={{ marginTop: "50px" }}>
      <button
        className="browse-button"
        style={{ backgroundImage: `url(${buttonPic})` }}
        onClick={clickHandle("Pokemon.csv")}
      >
        <h3 className="browse-buttonsH">Pokémon Stats</h3>
        <p className="browse-buttonsT">
          Dataset of different type of Pokémon and their stats!
        </p>
      </button>
      <button
        className="browse-button"
        style={{ backgroundImage: `url(${buttonPic})` }}
        onClick={clickHandle("Spotify2000.csv")}
      >
        <h3 className="browse-buttonsH">Spotify Top 2020</h3>
        <p className="browse-buttonsT">
          Spotify All Time Top 2020 collection dataset!
        </p>
      </button>
      <button
        className="browse-button"
        style={{ backgroundImage: `url(${buttonPic})` }}
        onClick={clickHandle("NBAFantasy2019.csv")}
      >
        <h3 className="browse-buttonsH">NBA Fantasy</h3>
        <p className="browse-buttonsT">
          NBA Fantasy Predictions for 2019-2020!
        </p>
      </button>
    </div>
  );
};

const findMore = () => {
  return (
    <div className="row center">
      <div className="row center" style={{paddingBottom: "5vh"}}>
        <h1 className="purple-text browse-header">
          Other places to find datasets
        </h1>
        <span className="browseP">
          Can't see what you are looking for? Check our the websites below!
        </span>
      </div>
      <ul>
        <li className="dataset-website">
          <a
            className="waves-effect waves-light btn-flat example-btns data-link"
            href="https://www.kaggle.com/datasets"
            rel="noopener noreferrer"
            target="_blank"
          >
            Kaggle
          </a>
        </li>
        <li className="dataset-website">
          <a
            className="waves-effect waves-light btn-flat example-btns data-link"
            href="https://data.world/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Data.world (needs login)
          </a>
        </li>
        <li className="dataset-website">
          <a
            className="waves-effect waves-light btn-flat example-btns data-link"
            href="https://registry.opendata.aws/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Amazon's open registry
          </a>
        </li>
        <li className="dataset-website">
          <a
            className="waves-effect waves-light btn-flat example-btns data-link"
            href="https://datasetsearch.research.google.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {" "}
            Google's dataset search engine
          </a>
        </li>
      </ul>
    </div>
  );
};

const Guide = (props) => {
  const { clickHandle } = props;
  return (
    <div className="container" style={{ width: "100vw" }}>
      {/* <div className="row">
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
      </div> */}
      <div className="row" style={{ paddingBottom: "10vh" }}>
        {examples(clickHandle)}
      </div>
      <div className="row">{findMore()}</div>
    </div>
  );
};

export default Guide;
