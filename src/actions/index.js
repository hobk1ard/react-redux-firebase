import { todosRef, restToDosRef, authRef, provider } from "../config/firebase";
import { FETCH_TODOS, FETCH_USER, REMOVE_TODOS, ADD_TODOS } from "./types";
import request from 'superagent';

export const addToDo = (newToDo, user) => async dispatch => {
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

export const completeToDo = (completeToDoId, user) => async dispatch => {
    // todosRef
    //     .child(user.uid)
    //     .child(completeToDoId)
    //     .remove();
    dispatch({
        type: REMOVE_TODOS,
        payload: completeToDoId
    });
    request.delete(restToDosRef).set('Authorization', 'Bearer ' + user.accessToken).set('uid', user.uid).set('toDoId', completeToDoId).then(res => {
        const payload = JSON.parse(res.text);
        if (res.status !== 200) {
            alert(`${res.status}: ${payload.message}`);
        }
    })
};

export const fetchToDos = (user) => async dispatch => {
    //   todosRef.child(user.uid).on("value", snapshot => {
    //     dispatch({
    //       type: FETCH_TODOS,
    //       payload: snapshot.val()
    //     });
    //   });
    request.get(restToDosRef).set('uid', user.uid).set('Authorization', 'Bearer ' + user.accessToken).then(res => {
        const payload = JSON.parse(res.text);
        if (res.status === 200) {
            dispatch({
                type: FETCH_TODOS,
                payload: payload.todos
            });
        }
        else {
            alert(`${res.status}: ${payload.message}`);
        }
    }).catch(err => {
        console.log(err.message);
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
            authRef.currentUser.getIdToken().then((idToken) => {
                window.localStorage.setItem("accessToken", idToken);
                window.localStorage.setItem("uid", result.user.uid);
                dispatch({
                    type: FETCH_USER,
                    payload: {
                        displayName: result.user.displayName,
                        email: result.user.email,
                        phoneNumber: result.user.phoneNumber,
                        photoURL: result.user.photoURL,
                        uid: result.user.uid,
                        accessToken: idToken
                    }
                });
            })
        })
        .then(idToken => {
            window.localStorage.setItem("accessToken", idToken);
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