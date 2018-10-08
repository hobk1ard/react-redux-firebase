import { FETCH_USER } from "../actions/types";
var initialStore = false;
const accessToken = window.localStorage.getItem("accessToken");
const uid = window.localStorage.getItem("uid");
if (accessToken && uid) {
  initialStore = {
    accessToken: accessToken,
    uid: uid
  }
}

export default (state = initialStore, action) => {
  switch (action.type) {
    case FETCH_USER:
      if (!action.payload || 
          (state && !state.accessToken && !action.payload.accessToken) || 
          (!action.payload.accessToken && state && state.uid !== action.payload.uid)) {
        return null;
      }
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};