import "./UserProfile.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserProfile extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="container-fluid">
                <div className="row">
                    <br /><br />
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="row">
                            <div className="col-md-auto">
                                <div className="row">
                                    <img
                                        className="profile-picture"
                                        alt="Check Mark"
                                        id="check-mark"
                                        src={user.photoURL}
                                        height="150"
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <h5 className="circle-label align-middle">Projects: </h5>
                                    </div>
                                    <div className="col-sm">
                                        <h4 className="circle white-text align-middle indigo darken-1 font-weight-bold">3</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <h5 className="circle-label align-middle">ToDos: </h5>
                                    </div>
                                    <div className="col-sm">
                                        <h4 className="circle white-text align-middle amber darken-1 font-weight-bold">3</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1" />
                            <div className="col">
                                <div className="row">
                                    <h4 className="font-weight-bold">{user.displayName}</h4>
                                    <hr />
                                </div>
                                <div className="row">
                                    <div className="col-md- font-weight-bold">Email: </div>
                                    <div className="col">{user.email}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md- font-weight-bold">Phone: </div>
                                    <div className="col">{user.phoneNumber}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps)(UserProfile);