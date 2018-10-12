import "./UserProfile.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { usersRef } from "../config/firebase";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        const { user } = this.props;
        var {userId} = this.props.match.params;
        userId = userId || user.uid;

        this.state = {
            userId: userId,
            public: {
                displayName: "Loading",
                photoURL: null,
                toDoCount: 0,
                projects: []
            },
            private: {
                email: "private",
                phoneNumber: "private"
            }
        };
    }

    // Component event that is invoked immediately after a component is mounted
    componentDidMount() {
        const { user } = this.props;
        const { userId } = this.state;
        usersRef.child(userId).child("public").once("value").then(snapshot => {
            this.setState({public: snapshot.val(),})
        }).catch (error => {
            console.log(error.message);
        });
        if (userId === user.uid) {
            usersRef.child(userId).child("private").once("value").then(snapshot => {
                this.setState({private: snapshot.val()})
            }).catch (error => {
                console.log(error.message);
            });
        }
    }
    
    render() {
        const { "public": publicData, "private": privateData } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <br /><br />
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="row">
                            <div className="col-auto">
                                <div className="row">
                                    <img
                                        className="profile-picture"
                                        alt="Check Mark"
                                        id="check-mark"
                                        src={publicData.photoURL}
                                        height="150"
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <h5 className="circle-label align-middle">Projects: </h5>
                                    </div>
                                    <div className="col-sm">
                                        <h4 className="circle white-text align-middle indigo darken-1 font-weight-bold">3</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        <h5 className="circle-label align-middle">ToDos: </h5>
                                    </div>
                                    <div className="col-sm">
                                        <h4 className="circle white-text align-middle amber darken-1 font-weight-bold">{publicData.toDoCount || 0}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1" />
                            <div className="col">
                                <div className="row">
                                    <h4 className="font-weight-bold">{publicData.displayName}</h4>
                                    <hr />
                                </div>
                                <div className="row">
                                    <div className="col-md- font-weight-bold">Email: </div>
                                    <div className="col">{privateData.email}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md- font-weight-bold">Phone: </div>
                                    <div className="col">{privateData.phoneNumber}</div>
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