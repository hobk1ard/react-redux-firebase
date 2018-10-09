import "./ToDoList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import ToDoListItem from "./ToDoListItem";

class ToDoList extends Component {
    state = {
        addFormVisible: false,
        addFormValue: ""
    };

    handleInputChange = event => {
        this.setState({ addFormValue: event.target.value });
    };

    handleFormSubmit = event => {
        const { addFormValue } = this.state;
        const { addToDo, user } = this.props;
        event.preventDefault();
        addToDo({ title: addFormValue }, user);
        this.setState({ addFormValue: "" });
    };

    renderAddForm = () => {
        const { addFormVisible, addFormValue } = this.state;
        if (addFormVisible) {
            return (
                <div id="todo-add-form" className="col s10 offset-s1">
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="input-field">
                            <i className="material-icons prefix">note_add</i>
                            <input
                                value={addFormValue}
                                onChange={this.handleInputChange}
                                id="toDoNext"
                                type="text"
                            />
                            <label htmlFor="toDoNext">What To Do Next</label>
                        </div>
                    </form>
                </div>
            );
        };
    };

    renderToDos() {
        const { data } = this.props;
        const toDos = _.map(data, (value, key) => {
            return (<div className="row"><ToDoListItem key={key} todoId={key} todo={value} /></div>);
        });
        if (!_.isEmpty(toDos)) {
            return toDos;
        }
        return (
            <div className="col s10 offset-s1 center-align">
                <img
                    alt="Nothing was found"
                    id="nothing-was-found"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTkgNTkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5IDU5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuOTg5ODAyIDAgMCAwLjk4OTgwMiAwLjMwMDg0IDAuMzAwODQpIj48Zz4KCTxwYXRoIGQ9Ik01MiwyMWMtMC41NTMsMC0xLDAuNDQ3LTEsMXYzMkgyVjVoNDl2MWMwLDAuNTUzLDAuNDQ3LDEsMSwxczEtMC40NDcsMS0xVjNIMHY1M2g1M1YyMkM1MywyMS40NDcsNTIuNTUzLDIxLDUyLDIxeiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgY2xhc3M9ImFjdGl2ZS1wYXRoIiBzdHlsZT0iZmlsbDojRkZDMTA3IiBkYXRhLW9sZF9jb2xvcj0iI2ZmYzEwNyI+PC9wYXRoPgoJPHBhdGggZD0iTTU4LjcwNyw3LjI5M2MtMC4zOTEtMC4zOTEtMS4wMjMtMC4zOTEtMS40MTQsMEwyNywzNy41ODZsLTEzLjA3LTEzLjA3Yy0wLjM5MS0wLjM5MS0xLjAyMy0wLjM5MS0xLjQxNCwwICAgcy0wLjM5MSwxLjAyMywwLDEuNDE0bDEzLjc3NywxMy43NzdDMjYuNDg4LDM5LjkwMiwyNi43NDQsNDAsMjcsNDBzMC41MTItMC4wOTgsMC43MDctMC4yOTNsMzEtMzEgICBDNTkuMDk4LDguMzE2LDU5LjA5OCw3LjY4NCw1OC43MDcsNy4yOTN6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiNGRkMxMDciIGRhdGEtb2xkX2NvbG9yPSIjZmZjMTA3Ij48L3BhdGg+CjwvZz48L2c+IDwvc3ZnPg=="
                    height="100"
                />
                <h4>You have completed all the tasks</h4>
                <p>Start by clicking add button in the bottom of the screen</p>
            </div>
        );
    }

    // Component event that is invoked immediately after a component is mounted
    componentDidMount() {
        const { user } = this.props;
        this.props.fetchToDos(user);
    }

    render() {
        const { addFormVisible } = this.state;
        return (
            <div className="to-do-list-container">
                <div className="row">
                    {this.renderAddForm()}
                </div>
                <div className="container">
                    {this.renderToDos()}
                </div>
                <div className="fixed-action-btn">
                    <button
                        onClick={this.props.signOut}
                        id="sign-out-button"
                        className="btn-floating btn-large amber darken-3"
                    >
                        <i className="large material-icons">exit_to_app</i>
                    </button>
                    <button
                        onClick={() => this.setState({ addFormVisible: !addFormVisible })}
                        className="btn-floating btn-large amber darken-3"
                    >
                        {addFormVisible ? (
                            <i className="large material-icons">close</i>
                        ) : (
                                <i className="large material-icons">add</i>
                            )}
                    </button>
                </div>
            </div>
        );
    };
}

const mapStateToProps = ({ data, user }) => {
    return { data, user };
};

export default connect(mapStateToProps, actions)(ToDoList);