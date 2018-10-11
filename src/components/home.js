import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <br /><br />
                </div>
                <div className="row justify-content-md-center center-align">
                    <div className="col" />
                    <div className="col-md-auto">
                        <img
                            alt="Check Mark"
                            id="check-mark"
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTkgNTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5IDU5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuOTg5ODAyIDAgMCAwLjk4OTgwMiAwLjMwMDg0IDAuMzAwODQpIj48Zz4KCTxwYXRoIGQ9Ik01MiwyMWMtMC41NTMsMC0xLDAuNDQ3LTEsMXYzMkgyVjVoNDl2MWMwLDAuNTUzLDAuNDQ3LDEsMSwxczEtMC40NDcsMS0xVjNIMHY1M2g1M1YyMkM1MywyMS40NDcsNTIuNTUzLDIxLDUyLDIxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojRkZDMTA3IiBkYXRhLW9sZF9jb2xvcj0iI2ZmYzEwNyI+PC9wYXRoPgoJPHBhdGggZD0iTTU4LjcwNyw3LjI5M2MtMC4zOTEtMC4zOTEtMS4wMjMtMC4zOTEtMS40MTQsMEwyNywzNy41ODZsLTEzLjA3LTEzLjA3Yy0wLjM5MS0wLjM5MS0xLjAyMy0wLjM5MS0xLjQxNCwwICAgcy0wLjM5MSwxLjAyMywwLDEuNDE0bDEzLjc3NywxMy43NzdDMjYuNDg4LDM5LjkwMiwyNi43NDQsNDAsMjcsNDBzMC41MTItMC4wOTgsMC43MDctMC4yOTNsMzEtMzEgICBDNTkuMDk4LDguMzE2LDU5LjA5OCw3LjY4NCw1OC43MDcsNy4yOTN6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGRkMxMDciIGRhdGEtb2xkX2NvbG9yPSIjZmZjMTA3Ij48L3BhdGg+CjwvZz48L2c+IDwvc3ZnPg=="
                            height="100"
                        />
                    </div>
                    <div className="col" />
                </div>
                <div className="row justify-content-md-center center-align">
                    <div className="col" />
                    <div className="col-md-auto"><h4>Welcome to Elementary ToDo management</h4></div>
                    <div className="col" />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps)(Home);