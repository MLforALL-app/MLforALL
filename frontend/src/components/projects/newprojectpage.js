import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CreateProject from "./createproject";
import BuildProject from "./buildproject";

class CreateProjectContainer extends Component {
    state = {
        project_initialized: false,
        project_id: ""
    };

    initProject = () => {
        this.setState({
            project_initialized: true
        });
        console.log("project initialized");
        
    };

    render () {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to="/signin" />;     
        return (
            <div>
             {this.state.project_initialized == false ?
               <CreateProject initProject={this.initProject} />
              :
              <BuildProject/>
             }
            </div>
 
        );
        
    }

}

const mapStateToProps = (state) => {
	return {
        auth: state.firebase.auth,
        projID: state.project.curUserProjID,
        curUserProj: state.project.curUserProj,
    };

};

export default connect(mapStateToProps)(CreateProjectContainer)