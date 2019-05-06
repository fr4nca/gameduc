import { GET_ERRORS } from "../actions/types";

const initalState = {
  msg: {},
  status: null
};

export default (state = initalState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status
      };
    default:
      return state;
  }
};
