import isEmpty from "../../utils/isEmpty";
import {
  SET_CURRENT_USER,
  SET_CURRENT_PROFILE,
  GET_ALL_ALUNOS,
  EDIT_PROFILE
} from "../actions/types";

const initalState = {
  isAuthenticated: false,
  user: {},
  profile: {},
  alunos: []
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case GET_ALL_ALUNOS:
      return {
        ...state,
        alunos: action.payload
      };
<<<<<<< HEAD
    case EDIT_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
=======

>>>>>>> 474b09c46ce4b100675c45721337e41122592d01
    default:
      return state;
  }
};
