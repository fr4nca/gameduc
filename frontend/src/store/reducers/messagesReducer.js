import { GET_MESSAGES, CREATE_MESSAGE } from "../actions/types";

const initalState = {};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;
    case CREATE_MESSAGE:
      return (state = action.payload);
    default:
      return state;
  }
};
