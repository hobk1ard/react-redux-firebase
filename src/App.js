import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  Footer,
  NavLink
} from "mdbreact";

import "./index.css";
import { connect } from "react-redux";
import { signIn } from "./actions";

import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: ""
    };
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });

  renderSignInNavLink = () => {
    const { user } = this.props;
    if (user) {
      return (
        <NavLink to="/UserProfile">
          <div className="row nav-signin-container">
            <i className="fa fa-user-circle-o fa-lg"></i>
            {user.displayName}
            <span className="sr-only">(current)</span>
          </div>
        </NavLink>
      );
    }
    else {
      return (
        <div className="row nav-signin-container">
          <a href="#" className="nav-signin" onClick={this.props.signIn}>
            <i className="fa fa-google social-signin-icon" />
            Sign In With Google
          </a>
        </div>
      );
    }
  }

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );
    return (
      <div className="flyout">
        <Navbar color="indigo" dark expand="md" fixed="top" scrolling>
          <NavbarBrand href="/" className="amber-text">
            <img
              alt="check box"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTkgNTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5IDU5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuOTg5ODAyIDAgMCAwLjk4OTgwMiAwLjMwMDg0IDAuMzAwODQpIj48Zz4KCTxwYXRoIGQ9Ik01MiwyMWMtMC41NTMsMC0xLDAuNDQ3LTEsMXYzMkgyVjVoNDl2MWMwLDAuNTUzLDAuNDQ3LDEsMSwxczEtMC40NDcsMS0xVjNIMHY1M2g1M1YyMkM1MywyMS40NDcsNTIuNTUzLDIxLDUyLDIxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojRkZDMTA3IiBkYXRhLW9sZF9jb2xvcj0iI2ZmYzEwNyI+PC9wYXRoPgoJPHBhdGggZD0iTTU4LjcwNyw3LjI5M2MtMC4zOTEtMC4zOTEtMS4wMjMtMC4zOTEtMS40MTQsMEwyNywzNy41ODZsLTEzLjA3LTEzLjA3Yy0wLjM5MS0wLjM5MS0xLjAyMy0wLjM5MS0xLjQxNCwwICAgcy0wLjM5MSwxLjAyMywwLDEuNDE0bDEzLjc3NywxMy43NzdDMjYuNDg4LDM5LjkwMiwyNi43NDQsNDAsMjcsNDBzMC41MTItMC4wOTgsMC43MDctMC4yOTNsMzEtMzEgICBDNTkuMDk4LDguMzE2LDU5LjA5OCw3LjY4NCw1OC43MDcsNy4yOTN6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGRkMxMDciIGRhdGEtb2xkX2NvbG9yPSIjZmZjMTA3Ij48L3BhdGg+CjwvZz48L2c+IDwvc3ZnPg=="
              height="40"
            />{" "}
            Elementary ToDo
            </NavbarBrand>
          {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
          <Collapse
            id="mainNavbarCollapse"
            isOpen={this.state.collapseID}
            navbar
          >
            <NavbarNav left>
              <NavItem>
                <NavLink
                  exact
                  to="/"
                  onClick={this.closeCollapse("mainNavbarCollapse")}
                >
                  Home
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={this.closeCollapse("mainNavbarCollapse")}
                  to="/projects"
                >
                  Projects
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={this.closeCollapse("mainNavbarCollapse")}
                  to="/ToDoList"
                >
                  ToDos
                  </NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
          <NavbarNav right>
            <NavItem>
              {this.renderSignInNavLink()}
            </NavItem>
          </NavbarNav>
        </Navbar>
        {this.state.collapseID && overlay}
        <main style={{ marginTop: "4rem" }}>
          <Routes />
        </main>

        <Footer color="indigo">
          <p className="footer-copyright mb-0 py-3 text-center">

          </p>
        </Footer>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default withRouter(connect(mapStateToProps, { signIn })(App));