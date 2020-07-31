import React, { Component } from "react";
import { connect } from "react-redux";
import { Column, Table } from "react-virtualized";
import { Redirect } from "react-router-dom";
import "react-virtualized/styles.css"; // only needs to be imported once
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import "firebase/storage";
import { updateCurrentWorkingProject } from "../../../../store/actions/projectActions";
import HelpBox from "../../../layouts/helpbox";
import styles from "../../../../styling/build.css";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class DisplayCSV extends Component {
  // Our flip boolean object data structure thing functions
  filterObj = (objState) => {
    return Object.entries(objState)
      .filter(([key, val]) => val)
      .map(([key, val]) => key);
  };
  initObj = (objList) => {
    var objState = {};
    objList.forEach((item) => {
      objState[item] = false;
    });
    return objState;
  };
  // State
  state = {
    csvArray: [],
    redirect: false,
    loading: false,
    error: false,
    inputs: this.initObj(Object.keys(this.props.csvData[0])),
  };
  // Handlers for things on the page
  handleHeaderClick = ({ columnData, dataKey, event }) => {
    this.setState((prevState) => {
      var newInputs = prevState.inputs;
      newInputs[dataKey] = !newInputs[dataKey];
      return { ...prevState, inputs: newInputs };
    });
  };
  handleDropdownOutput = (event) => {
    this.setState({ output: event.target.value });
  };

  // get functions to populate things on page
  getMenuItems = (headers) => {
    var menuitems = [];
    headers.forEach((h) => {
      menuitems.push(
        <MenuItem key={h} value={h}>
          {h}
        </MenuItem>
      );
    });
    return menuitems;
  };
  checkBoxChange = (colName) => (e) => {
    this.setState((prevState) => {
      var newInputs = prevState.inputs;
      newInputs[colName] = !newInputs[colName];
      return { ...prevState, inputs: newInputs };
    });
    this.props.updateCurrentWorkingProject(this.state.inputs);
  };
  checkBoxHeader = (colName, is_numeric) => (key) => {
    return (
      <div>
        <div>
          {!is_numeric ? (
            <FormControlLabel
              className="purple-text"
              value="bottom"
              control={<Checkbox disabled className="disabled" />}
              label=""
              labelPlacement="bottom"
              onChange={this.checkBoxChange(colName)}
            />
          ) : (
            <FormControlLabel
              className="purple-text"
              value="bottom"
              control={<Checkbox color="primary" />}
              label=""
              checked={this.state.inputs[colName] ? true : false}
              labelPlacement="bottom"
              onChange={this.checkBoxChange(colName)}
            />
          )}
        </div>
        <span className="ReactVirtualized__Table__headerTruncatedText purple-text">
          {colName}
        </span>
      </div>
    );
  };

  isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  getColumns = (keyList, firstRow) => {
    var columns = [];
    keyList.forEach((key) => {
      let numeric_col = this.isNumeric(firstRow[key]);
      let colName = key;
      columns.push(
        <Column
          label={key}
          dataKey={key}
          key={key}
          headerRenderer={this.checkBoxHeader(colName, numeric_col)}
          width={5000}
        />
      );
    });
    return columns;
  };

  componentDidUpdate = () => {
    if (this.state.loading === true && this.props.inputs) {
      this.setState((prevState, prevProps) => {
        return {
          csvArray: prevProps.csvData,
          inputs: prevProps.inputs,
          loading: false,
        };
      });
    }
  };

  componentDidMount = () => {
    let thingsToSelect = this.props.selectedVariables;
    thingsToSelect.forEach((item) => {
      this.checkBoxChange(item.name)(null);
    });
  };
  render() {
    return (
      <div className="displaycsv">
        {this.state.redirect ? (
          <Redirect to={"/project/" + this.props.id} />
        ) : (
          <span></span>
        )}
        {(this.props.csvData && this.props.csvData.length) === 0 ? (
          <div className="container center">
            <CircularProgress />
          </div>
        ) : (
          <div className="isactive">
            <div className="row container">
              <h5>
                <b>
                  1. I want to consider these input parameters...{" "}
                  <span className="pink-text">
                    <HelpBox
                      header="Click to Toggle Parameters"
                      placement="right-end"
                      desc="Here, you can click the headers to toggle on/off whether or not you want an input column to be considered by your model. Please note that you can choose columns containing ONLY NUMERICAL data."
                    />
                  </span>
                </b>
              </h5>

              <Table
                width={1000}
                height={400}
                headerHeight={60}
                rowHeight={25}
                rowCount={this.props.csvData.length}
                rowGetter={({ index }) => this.props.csvData[index]}
                rowClassName={({ index }) => {
                  if (index < 0) {
                    return styles.headerRow;
                  } else {
                    return index % 2 === 0 ? "evenRow" : "oddRow";
                  }
                }}
              >
                {this.getColumns(
                  Object.keys(this.props.csvData[0]),
                  this.props.csvData[0]
                )}
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    auth: state.firebase.auth,
    csvData: state.project.csvData,
    inputs:
      state.project.currentWorkingProject &&
      state.project.currentWorkingProject.inputs,
  };
};
// Redux to associate action call to a dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentWorkingProject: (inputs) =>
      dispatch(updateCurrentWorkingProject("inputs", inputs)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(DisplayCSV);
