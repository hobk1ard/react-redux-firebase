import { todosRef, restToDosRef, authRef, provider } from "../config/firebase";
import { FETCH_TODOS, FETCH_USER, REMOVE_TODOS, ADD_TODOS } from "./types";
import request from 'superagent';

export const addToDo = (newToDo, uid) => async dispatch => {
    debugger;
    var toDoRef = todosRef
        .child(uid)
        .push();
    toDoRef.set(newToDo);
    dispatch({
        type: ADD_TODOS,
        id: toDoRef.key,
        payload: newToDo
    });
    // request.post(restToDosRef).send(newToDo).then(res => {
    //     console.log("New ToDo added");
    // }).catch(err => {
    //     console.log("Error adding new ToDo: " + err.message);
    // });
};

export const completeToDo = (completeToDoId, uid) => async dispatch => {
    // todosRef
    //     .child(uid)
    //     .child(completeToDoId)
    //     .remove();
    dispatch({
        type: REMOVE_TODOS,
        payload: completeToDoId
    });
    request.delete(restToDosRef).set('uid', uid).set('toDoId', completeToDoId).then(res => {
        debugger;
        const payload = JSON.parse(res.text);
        if (res.status !== 200) {
            debugger;
            alert(`${res.status}: ${payload.message}`);
        }
    })
};

export const fetchToDos = (uid) => async dispatch => {
    //   todosRef.child(uid).on("value", snapshot => {
    //       debugger;
    //     dispatch({
    //       type: FETCH_TODOS,
    //       payload: snapshot.val()
    //     });
    //   });
    request.get(restToDosRef).set('uid', uid).then(res => {
        debugger;
        const payload = JSON.parse(res.text);
        if (res.status === 200) {
            dispatch({
                type: FETCH_TODOS,
                payload: payload.todos
            });
        }
        else {
            debugger;
            alert(`${res.status}: ${payload.message}`);
        }
    })
};

export const fetchUser = () => dispatch => {
    authRef.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: FETCH_USER,
                payload: user
            });
        }
        else {
            dispatch({
                type: FETCH_USER,
                payload: null
            });
        }
    });
};

export const signIn = () => dispatch => {
    authRef
        .signInWithPopup(provider)
        .then(result => {
            console.log("Sign in successful");
        })
        .catch(error => {
            console.log(error);
        });
};

export const signOut = () => dispatch => {
    authRef
        .signOut()
        .then(() => {
            console.log("Sign out successful");
        })
        .catch(error => {
            console.log(error);
        });
};