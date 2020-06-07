import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class HandleNANs extends Component {
    state = {
        NaanCount : 0
    }
    //call describe to get naan count 
    //ask user about how to handle naans 
    getDescriptive = () => {
        var path = {
            uid : this.props.uid,
            projId : this.props.projId,
            csvName : this.props.csvName
        };
        console.log(path);
        axios.post(`https://flask-api-aomh7gr2xq-ue.a.run.app/describe`, path)
             .then((res) => {
                 console.log("THIS IS WHAT WE GET BAYBEE", res);
                 this.setState({
                     NaanCount : res.data["NaN"]
                 });

             })
    };
    componentDidMount = () => {
        this.getDescriptive(); 
    }
    render () {
        return (
            <div className = "NaanHelper">
                <div className = "row container">
                    <h6 className = "yellow-warning-text">
                       <b>!!! This project has {this.state.NaanCount} Naans. </b>
                    </h6>
                    <h6 className = "yellow-warning-text">
                       <b>How would you like to handle these? </b>
                    </h6>
                </div>
            </div>
        );
    };
} 

export default HandleNANs;