import * as firebase from "firebase";

import {FirebaseConfig} from "../config/keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const cloudFunctionRef = "https://us-central1-elementary-336ee.cloudfunctions.net";

export const restToDosRef = "https://us-central1-elementary-336ee.cloudfunctions.net/toDo/";
