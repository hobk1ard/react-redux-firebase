const FirebaseServer = require('firebase-server');

new FirebaseServer(5000, 'localhost', {
    "todos" : {
        "QYvbLlLx1mYkWqK4Kb79VW9lyeD2" : {
        "-LOUKErM2sOHpzheRqyN" : {
            "title" : "h"
        }
        }
    },
    "users" : {
        "QYvbLlLx1mYkWqK4Kb79VW9lyeD2" : {
        "private" : {
            "email" : "hobbes.kinard@gmail.com"
        },
        "public" : {
            "displayName" : "Robert Kinard",
            "photoURL" : "https://lh5.googleusercontent.com/-ZqQc5GN75K0/AAAAAAAAAAI/AAAAAAAAApY/ylNmvllHUIE/photo.jpg",
            "toDoCount" : 1
        }
        },
        "tScZKNz9oAazEVXVwBetVpwvRO82" : {
        "private" : {
            "email" : "ashamantaintfree@gmail.com"
        },
        "public" : {
            "displayName" : "Robert Kinard",
            "photoURL" : "https://lh6.googleusercontent.com/-Eenj-B4mPzE/AAAAAAAAAAI/AAAAAAAAAAA/AAN31DVuZi9Adp-ECCleAWXe7CJm-PwHsg/mo/photo.jpg"
        }
        }
    }
});

export const FirebaseConfig = {
    apiKey: "AIzaSyC9PRMB1PGPVeLbjqaVwFV8ir1x4NasZ18",
    databaseURL: "ws://localhost:5000"
};

export const requestConfig = "API";