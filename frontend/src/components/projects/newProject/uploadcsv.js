import React, { Component } from "react";
import { connect } from "react-redux";
import { uploadCSV } from "../../../store/actions/projectActions";
class UploadCSV extends Component {
    state = {
        csv: "" 
    }
    handleChange = (e) => {
        this.setState({
            csv : e.target.files[0]
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

    };
    render () {
        return (
            <div className = "row">
                <form className="card z-depth-1"
                      onSubmit={this.handleSubmit}>
                <span className="card-title purple-text">Upload Data 😄</span>
                    <div className="file-field input-field">
                    
                        <div className="btn z-depth-0">
                            <span>Browse</span>
                            <input
                                type="file"
                                id="csvName"
                                style={{ borderRadius: "50px" }}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="file-path-wrapper">
                            <input
                                className="file-path validate"
                                type="text"
                                placeholder="Upload .csv file"
                                accept=".csv"
                            />
                    </div>
                </form>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        uploadCSV : (csv, project) => dispatch(uploadCSV(csv, project)) 
    }
}
export default connect(mapDispatchToProps)(UploadCSV);