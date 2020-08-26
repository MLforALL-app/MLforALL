import React, { Component } from "react";
import { connect } from "react-redux";
import { nameMapper, addSpace } from "../../../../store/actions/nameMapper";
import No4 from "../../../../pictures/project/number4.png";
import "../../../../styling/build.css";

class ProjectStatus extends Component {
  state = {
    error: false,
  };

  filterObj = (objState) => {
    return Object.entries(objState)
      .filter(([key, val]) => val)
      .map(([key, val]) => key);
  };

  getStatus = (inputs, output, models, nameMapper) => {
    return (
      <div className="container">
        <span className="">
          <h5>
            <b style={{
              backgroundImage: `url(${No4})`,
              backgroundSize: "36px 36px",
              paddingBottom: "7px",
            }}
            className="number-image">
              {this.state.error
                ? "Something went Wrong"
                : "Summary"}{" "}
            </b>
          </h5>
        </span>
        <h6 className="summaryDesc">
          This model will take these parameters:
          <span className="purple-text">{addSpace(inputs)}</span>
          <br /> To attempt to predict:{" "}
          <span className="purple-text">{output}</span> <br /> Using these
          algorithms:
          <span className="purple-text">
            {addSpace(models.map((s) => nameMapper(s)))}
          </span>
        </h6>
      </div>
    );
  };

  render() {
    if (this.props.CWP === undefined || this.props.CWP === {}) {
      return <span>waiting</span>;
    }
    return (
      <div className="row" style={{ padding: "2rem" }}>
        {this.getStatus(
          this.filterObj(this.props.CWP.inputs),
          this.props.CWP.targetParameter,
          this.filterObj(this.props.CWP.modelList),
          nameMapper
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    CWP: state.project.currentWorkingProject,
  };
};

export default connect(mapStateToProps)(ProjectStatus);
