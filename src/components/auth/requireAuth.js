import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default function(ComposedComponent, SignInComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        };

        componentDidMount() {
            if (this.props.authenticated === null) {
                this.context.router.history.push("/");
            }
        }

        componentDidUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.history.push("/");
            }
        }

        render() {
            if (this.props.authenticated) {
                return <ComposedComponent {...this.props} />;
            }
            return <SignInComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {authenticated: state.auth};
    }

    return connect(mapStateToProps)(Authentication);
}