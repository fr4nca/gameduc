import { combineReducers } from "redux";

import authReducer from "./authReducer";
import gameReducer from "./gameReducer";
import disciplinaReducer from "./disciplinaReducer";

export default combineReducers({
  auth: authReducer,
  game: gameReducer,
  disciplina: disciplinaReducer
});
