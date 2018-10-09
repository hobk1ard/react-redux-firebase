import { todosRef, restCloudToDosRef, restApiToDosRef, authRef, provider } from "../config/firebase";
import { FETCH_TODOS, FETCH_USER, REMOVE_TODOS, ADD_TODOS } from "./types";
import request from 'superagent';
import requestConfig from '../config/keys';

export const addToDo = (newToDo, user) => async dispatch => {
    if (user) {
        switch (requestConfig) {
            case "REST_API":
                request.post(restApiToDosRef + "/" + user.uid).send(newToDo).then(res => {
                    console.log("New ToDo added");
                }).catch(err => {
                    console.log("Error adding new ToDo: " + err.message);
                });
                break;
            case "API":
            default:
                var toDoRef = todosRef
                    .child(user.uid)
                    .push();
                toDoRef.set(newToDo);
                dispatch({
                    type: ADD_TODOS,
                    id: toDoRef.key,
                    payload: newToDo
                });
                break;
        }
    }
    else {
        userNotFound(dispatch);
    }
};

export const completeToDo = (completeToDoId, user) => async dispatch => {
    if (user) {
        switch (requestConfig) {
            case "REST_CLOUD":
                dispatch({
                    type: REMOVE_TODOS,
                    payload: completeToDoId
                });
                request.delete(restCloudToDosRef).set('Authorization', 'Bearer ' + user.accessToken).set('uid', user.uid).set('toDoId', completeToDoId).then(res => {
                    const payload = JSON.parse(res.text);
                    if (res.status !== 200) {
                        alert(`${res.status}: ${payload.message}`);
                    }
                });
                break;
            case "API":
            default:
                todosRef
                    .child(user.uid)
                    .child(completeToDoId)
                    .remove();
                break;
        }
    }
    else {
        userNotFound(dispatch);
    }
};

export const fetchToDos = (user) => async dispatch => {
    debugger;
    if (user) {
        switch (requestConfig) {
            case "REST_CLOUD":
                request.get(restCloudToDosRef).set('uid', user.uid).set('Authorization', 'Bearer ' + user.accessToken).then(res => {
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
                break;
            case "API":
            default:
                debugger;
                todosRef.child(user.uid).on("value", snapshot => {
                    dispatch({
                        type: FETCH_TODOS,
                        payload: snapshot.val()
                    });
                });
                break;
        }
    }
    else {
        userNotFound(dispatch);
    }
};

export const fetchUser = () => dispatch => {
    authRef.onAuthStateChanged(user => {
        debugger;
        if (user) {
            if (!user.accessToken) {
                authRef.currentUser.getIdToken().then((idToken) => {
                    window.localStorage.setItem("accessToken", idToken);
                    window.localStorage.setItem("uid", user.uid);
                    dispatch({
                        type: FETCH_USER,
                        payload: {
                            displayName: user.displayName,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            photoURL: user.photoURL,
                            uid: user.uid,
                            accessToken: idToken
                        }
                    });
                });
            }
            else {
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
        }
        else {
            userNotFound(dispatch);
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

const userNotFound = () => dispatch => {
    dispatch({
        type: FETCH_USER,
        payload: null
    });
}