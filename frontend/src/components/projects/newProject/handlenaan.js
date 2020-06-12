import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./build.css";
import Insights from "./insights";

class NaanHandler extends Component {

    render () {
        this.state = {
            nanMethod: "drop",
        }
        handleDropdownNan = (event) => {
            this.setState({ nanMethod: event.target.value });
        };
        return (
            <span>
                <div className="row container">
                    <Insights project={this.props.project} />
                    <h6>
                        <b>
                            How do you want to deal with NaN's?{" "}
                            <FormControl>
                                <Select
                                    value={this.state.nanMethod}
                                    onChange={
                                        this.handleDropdownNan
                                    }
                                    displayEmpty
                                >
                                    {this.getMenuItems([
                                        "drop",
                                        "zero",
                                        "median",
                                        "mean"
                                    ])}
                                </Select>
                                <FormHelperText>
                                    Method
                                </FormHelperText>
                            </FormControl>
                            {"  "}
                            <span className="pink-text">
                                <HelpBox
                                    header="Data Cleaning Dropdown"
                                    placement="right"
                                    desc="Use this dropdown menu to select how you would like to clean your NaN's. Drop will ignore all the rows that contain NaN's in a particular column. Zero will set all NaN's to zero. Median/mean will replace all NaN's with the median/mean of the existing inputs."
                                />
                            </span>
                        </b>
                    </h6>
                </div>
            </span>
        );
    };
}


export default NaanHandler;