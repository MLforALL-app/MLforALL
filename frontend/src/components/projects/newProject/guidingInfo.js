import React from "react";
import "../../../styling/createproject.css";
import buttonPic from "../../../pictures/project/example-button-picture.png";

const examples = (clickHandle) => {
  const exampleCard = (csvName, title, desc) => {
    return (
      <button
        className="browse-button"
        style={{ backgroundImage: `url(${buttonPic})` }}
        onClick={clickHandle(csvName)}
      >
        <h3 className="browse-buttonsH">{title}</h3>
        <p className="browse-buttonsT">{desc}</p>
      </button>
    );
  };
  return (
    <div className="land-row" style={{ marginTop: "50px" }}>
      {exampleCard(
        "Pokemon.csv",
        "Pokémon Stats",
        "Dataset of different type of Pokémon and their stats!"
      )}
      {exampleCard(
        "Spotify2000.csv",
        "Spotify Top 2020",
        "Spotify All Time Top 2020 collection dataset!"
      )}
      {exampleCard(
        "NBAFantasy2019.csv",
        "NBA Fantasy",
        "NBA Fantasy Basketball Predictions for 2019-2020!"
      )}
    </div>
  );
};

const findMore = () => {
  return (
    <div style={{ marginTop: "-5rem", paddingBottom: "1rem" }}>
      <h1 className="purple-text browse-header">
        Other places to find datasets
      </h1>
      <span className="browseP">
        Can't see what you are looking for? Check our the websites below!
      </span>
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
    <div className="container center" style={{ width: "100vw" }}>
      <div style={{ paddingBottom: "10vh" }}>{examples(clickHandle)}</div>
      {findMore()}
    </div>
  );
};

export default Guide;
