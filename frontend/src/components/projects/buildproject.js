import React, { Component } from "react";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

class BuildProject  extends Component {
    render () {
        if (!this.props.projID)  return (
			<div className="container center">
				<CircularProgress />
			</div>
		);   

        return (
            <div className="container">

                <h4 className="grey-text text-darken-3">Congrats On Your First Project</h4>
                <p>Now that we have initialized your project and data, we can begin some exploratory data analysis.
                   Our step by step exploratory data analysis process will allow you to make educated decisions when
                   choosing and creating machine learning models. 
                </p>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projID : state.project.curUserProjID,
        proj : state.project.curProj
    }
}

export default connect(mapStateToProps)(BuildProject);