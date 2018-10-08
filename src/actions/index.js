import { todosRef, restToDosRef, authRef, provider, getUserToDoURL } from "../config/firebase";
import { FETCH_TODOS, FETCH_USER } from "./types";
import request from 'superagent';

export const addToDo = (newToDo, user) => async dispatch => {
    //   todosRef
    //     .child(user.uid)
    //     .push()
    //     .set(newToDo);
    if (!user) {
        signOut();
        return;
    }
    //request.post(getUserToDoURL(user.uid)).set("Authorization", "Bearer " + user.accessToken).send(newToDo).then(res => {
    //request.post(restToDosRef).send(newToDo).then(res => {
    request.post(restToDosRef).query('auth=' + user.accessToken).send(newToDo).then(res => {
        console.log("New ToDo added");
        debugger;
    }).catch(err => {
        console.log("Error adding new ToDo: " + err.message);
        debugger;
    });
};

export const completeToDo = (completeToDoId, user) => async dispatch => {
    if (!user) {
        signOut();
        return;
    }
    todosRef
        .child(user.uid)
        .child(completeToDoId)
        .remove();
};

export const fetchToDos = (user) => async dispatch => {
    if (!user) {
        signOut();
        return;
    }
    // todosRef.child(user.uid).on("value", snapshot => {
    //     dispatch({
    //         type: FETCH_TODOS,
    //         payload: snapshot.val()
    //     });
    // });
    debugger;
    //request.get(restToDosRef).query('uid=' + user.uid).query('auth=' + user.accessToken).then(res => {
    request.get(restToDosRef).query('uid=' + user.uid).then(res => {
    //request.get(restToDosRef).then(res => {
        debugger;
        dispatch({
            type: FETCH_TODOS,
            payload: res.val()
        });
    }).catch(err => {
        console.log("Error adding new ToDo: " + err.message);
        debugger;
    });
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