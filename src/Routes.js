import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import requireAuth from "./components/auth/requireAuth";
import ToDoList from "./components/ToDoList";
import SignIn from "./components/SignIn";

import { fetchUser } from "./actions";

class Routes extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
      }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/app" component={requireAuth(ToDoList, SignIn)} />
                <Route
                    render={function () {
                        return <h1>Not Found</h1>;
                    }}
                />
            </Switch>
        );
    }
}

export default connect(null, { fetchUser })(Routes);