import React, { Component } from "react";
import { connect } from "react-redux";

import DisplayCSV from "./displayCSV";


class BuildProject  extends Component {


    render () {

        return (
            <div className="container">

                <h4 className="grey-text text-darken-3">Congrats On Your First Project</h4>
                <p>Now that we have initialized your project and data, we can begin some exploratory data analysis.
                   Our step by step exploratory data analysis process will allow you to make educated decisions when
                   choosing and creating machine learning models. 
                </p>
                {console.log(this.props)}
                <DisplayCSV csv = {this.props.proj.csvName} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        projID : state.project.curUserProjID,
        proj : state.project.curUserProj
    }
}

export default connect(mapStateToProps)(BuildProject);