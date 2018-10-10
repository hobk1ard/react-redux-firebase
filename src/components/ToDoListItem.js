import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class ToDoListItem extends Component {
    render() {
        const { todoId, todo, handleCompleteClick} = this.props;
        return (
            <div key="toDoName" className="col-10 offset-1 to-do-list-item indigo">
                <h4>
                    {todo.title}{" "}
                    <span
                        onClick={() => handleCompleteClick(todoId)}
                        className="complete-todo-item waves-effect waves-yellow waves-light lighten-3 white-text text-darken-4 btn"
                    >
                        <i className="large material-icons">done</i>
                    </span>
                </h4>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user
    };
}

export default connect(mapStateToProps, actions)(ToDoListItem);