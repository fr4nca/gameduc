import { combineReducers } from "redux";

import authReducer from "./authReducer";
import gameReducer from "./gameReducer";
import disciplinaReducer from "./disciplinaReducer";
import tarefaReducer from "./tarefaReducer";

export default combineReducers({
  auth: authReducer,
  game: gameReducer,
  disciplina: disciplinaReducer,
  tarefa: tarefaReducer
});
