import * as firebase from "firebase";

import {FirebaseConfig} from "../config/keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();

export const todosRef = databaseRef.child("todos");
export const usersRef = databaseRef.child("users");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const cloudFunctionRef = "https://us-central1-elementary-336ee.cloudfunctions.net";

export const restApiToDosRef = `https://${FirebaseConfig.databaseURL}/toDo/`;
export const restApiUserRef = `https://${FirebaseConfig.databaseURL}/users/`;
export const restCloudToDosRef = "https://us-central1-elementary-336ee.cloudfunctions.net/toDo/";
