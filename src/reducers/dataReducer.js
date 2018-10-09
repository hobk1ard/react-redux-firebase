import { FETCH_TODOS, ADD_TODOS, REMOVE_TODOS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return action.payload;
    case ADD_TODOS:
      return {...state, [action.id]: action.payload};
    case REMOVE_TODOS:
      var newState = {...state};
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};