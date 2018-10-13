Technical Questions:
-------------------------------
var j = 0;
j = 0;
// Has global scope to the frame. It can also be accessed by child frames or as a property of the current frame.
-------------------------------
function j(j) {
    return j + j;
}
//function j has global scope to the frame and is defined when the script loads
//parameter j has function scope and is used for the j's in the function
-------------------------------
var j = function(b) {
    return b + 10;
}
// function j here is very similar to the previous one except that it is only defined once the line is reached in the code, basically you cannot perform function j until after these lines of code.
-------------------------------
function(x) {
    let j = 10;
    return j * x;
}
// let j has has block scope, but in this case would work functionally the same as using var to declare it
-------------------------------
//Referenced by <script src=”file.js” />
var j = 10;
// I am not entirely sure what distinction you are making with the comment. But "file.js" could have access to j as long as both scripts are loaded within the same frame.
-------------------------------
-------------------------------
/*What ways could this function be executed?*/
var a = function(b) {
    return b * 10;
}
// a(1);
// eval("a(1)");
// window.a(1);
-------------------------------
-------------------------------
/*What does this function do? How would you unit test this function?*/
export default function c(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
//it is a default export function, so it can be included/required by other js pages. because it is default is also should not the name c here. Its actual name would be default
//Without seeing a prototype of the expected parameters, it is a little hard to tell what it would be used for, but it looks like it is designed to combine classes returning a single constructor.
//This is similar to what the redux compose or combineReducers function does
//As for unit testing i would write a few tests with sample inputs and check the output. I would specifically do at least 3 tests.
// 1. 0 parameters
// 2. 1 parameter
// 3. >1 parameter
-------------------------------
-------------------------------
Coding Test
//You can see the website deployed and functioning at https://elementary-336ee.firebaseapp.com/
// The source code is at https://github.com/hobk1ard/react-redux-firebase
// I actually wrote parts of the actions to use multiple communication methods. Firebase has a very convenient API that i used by default. But I also used the firebase Rest API for a few things. Unfortunately, the Rest API cannot be used with security from a client, so I wrote a few firebase functions using the express framework that includes the Oauth validation. Unfortunately, the firebase functions are extremely rate limited on the free plan, which made the application unusable when try to solely use the functions. I hope that the different methods demonstrate that I can use and write a Rest API. You can see the firebase function code in the https://github.com/hobk1ard/firebase-todo-cloud-functions repo.
-------------------------------
-------------------------------
Summary Questions
/*How did you approach the design of this application?*/
//Mostly from the perspective of a chance to learn these technologies. I took an iterative approach building one aspect, manually testing it, and then adding more functionality. If I did it again, I would probably use test driven development around the actions and reducers. I would also probably take some of the components and break them down into some more re-usable versions that are unit testable.
/*Why did you choose the specific events to trigger actions?*/
/*Did you place all state into Redux or was it a combination of React and Redux?*/
// I used a combination. If I did not see any use for the data outside of a single page/component I left it in the local state or if i just needed as a flag to update the component render. This is evidenced on the user profile page where if you view the page from someone other than the active user, i would not need that in the redux store like I need to current users information.
/*How did you get React and Redux to play nicely together?*/
//I used the react-redux framework, it makes it pretty simple
/*What changes would you make if you had more time to complete this application?*/
// Oh a lot more, but I had to draw the line on my time for now. 
// - Projects: I wanted to add projects that multiple users could create and join and could add project tasks separate from their personal ones. Throw in a sidebar that would allow the user to quickly switch between their projects and personal to do list. 
// - Go back through and remove materialize.js and just use bootstrap
// - Improve the user experience while the store is updating/loading
// - Add a sign up process outside of google
// - move some of the functionality into the firebase functions. particurally around updating the counts
// - really expand the firebase-server testing