import { todosRef, restToDosRef, authRef, provider } from "../config/firebase";
import { FETCH_TODOS, FETCH_USER } from "./types";
import request from 'superagent';

export const addToDo = (newToDo, uid) => async dispatch => {
    todosRef
        .child(uid)
        .push()
        .set(newToDo);
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
    // debugger;
    request.get(restToDosRef).set('uid', uid).then(res => {
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