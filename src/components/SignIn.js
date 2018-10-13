import "./SignIn.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../actions";
import PropTypes from "prop-types";

class Signin extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillUpdate(nextProps) {
        if (nextProps.user) {
            this.context.router.history.push("/app");
        }
    }

    render() {
        return (
            <div className="row social-signin-container">
                <div className="col s10 offset-s1 center-align">
                    <img alt="Sign in" id="sign-in" src="/img/user.png" />
                    <br />
                    <a href="#" className="social-signin" onClick={this.props.signIn}>
                        <i className="fa fa-google social-signin-icon" />
                        Sign In With Google
                    </a>
                </div>
            </div>
        );
    }
}

function mapStateToProps({user}) {
    return {user};
}

export default connect(mapStateToProps, {signIn})(Signin);