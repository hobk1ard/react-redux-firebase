import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default function(ComposedComponent, SignInComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        };

        componentDidMount() {
            if (this.props.user === null || !this.props.user.accessToken) {
                //this.context.router.history.push("/");
            }
        }

        componentDidUpdate(nextProps) {
            if (!nextProps.user || !nextProps.user.accessToken) {
                //this.context.router.history.push("/");
            }
        }

        render() {
            debugger;
            if (this.props.user && this.props.user.accessToken) {
                return <ComposedComponent {...this.props} />;
            }
            return <SignInComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {user: state.user};
    }

    return connect(mapStateToProps)(Authentication);
}