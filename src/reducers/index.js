import { combineReducers } from "redux";

import toDoList from "./todoReducer";
import user from "./userReducer";

export default combineReducers({
  toDoList,
  user
});