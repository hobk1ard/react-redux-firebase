import { todosRef, restToDosRef, authRef, provider, getUserToDoURL } from "../config/firebase";
import { FETCH_TODOS, FETCH_USER, REMOVE_TODOS, ADD_TODOS } from "./types";
import request from 'superagent';

export const addToDo = (newToDo, user) => async dispatch => {
    debugger;
    var toDoRef = todosRef
        .child(user.uid)
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
    //     .child(user.uid)
    //     .child(completeToDoId)
    //     .remove();
    dispatch({
        type: REMOVE_TODOS,
        payload: completeToDoId
    });
    request.delete(restToDosRef).set('uid', user.uid).set('toDoId', completeToDoId).then(res => {
        debugger;
        const payload = JSON.parse(res.text);
        if (res.status !== 200) {
            debugger;
            alert(`${res.status}: ${payload.message}`);
        }
    })
};

export const fetchToDos = (userid) => async dispatch => {
    //   todosRef.child(user.uid).on("value", snapshot => {
    //       debugger;
    //     dispatch({
    //       type: FETCH_TODOS,
    //       payload: snapshot.val()
    //     });
    //   });
    request.get(restToDosRef).set('uid', user.uid).then(res => {
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
                payload: {
                    displayName: user.displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                    uid: user.uid,
                }
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
            debugger;
            window.localStorage.setItem("accessToken", result.credential.idToken);
            window.localStorage.setItem("uid", result.user.uid);
            dispatch({
                type: FETCH_USER,
                payload: {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    phoneNumber: result.user.phoneNumber,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid,
                    accessToken: result.credential.idToken
                }
            });
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