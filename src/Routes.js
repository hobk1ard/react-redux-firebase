import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import requireAuth from "./components/auth/requireAuth";
import ToDoList from "./components/ToDoList";
import SignIn from "./components/SignIn";
import UserProfile from "./components/UserProfile";
import Home from "./components/Home";
import Projects from "./components/Projects";

import { fetchCurrentUser } from "./actions";

class Routes extends React.Component {
    componentDidMount() {
        this.props.fetchCurrentUser();
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Home" component={Home} />
                <Route exact path="/SignIn" component={requireAuth(UserProfile, SignIn)} />
                {/* <Route path="/ToDoList" component={requireAuth(ToDoList, SignIn)} /> */}
                <Route path="/ToDoList" component={requireAuth(ToDoList, SignIn)} />
                <Route path="/UserProfile" component={requireAuth(UserProfile, SignIn)} />
                <Route path="/Projects" component={Projects} />
                <Route
                    render={function () {
                        return <h1>Not Found</h1>;
                    }}
                />
            </Switch>
        );
    }
}

export default connect(null, { fetchCurrentUser })(Routes);