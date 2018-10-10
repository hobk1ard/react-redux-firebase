import { FETCH_TODOS, ADD_TODOS, REMOVE_TODOS } from "../actions/types";

const initialState = {
  userId: null,
  projectId: null,
  count: 0,
  toDos: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return action.payload;
    case ADD_TODOS:
      return {...state, count: state.count + 1, toDos: {...state.toDos, [action.id]: action.payload}};
    case REMOVE_TODOS:
      var newState = {...state, count: state.count - 1};
      delete newState.toDos[action.payload];
      return newState;
    default:
      return state;
  }
};