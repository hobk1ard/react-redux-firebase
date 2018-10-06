import React, { Component } from "react";
import ToDoList from "./components/ToDoList";
import SignIn from "./components/SignIn";
import requireAuth from "./components/auth/requireAuth";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">          
          <Route exact path="/" component={SignIn} />
          <Route path="/app" component={requireAuth(ToDoList, SignIn)} />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, { fetchUser })(App);
