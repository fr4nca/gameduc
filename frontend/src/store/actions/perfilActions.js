import axios from "../../services/api";

import { EDIT_PROFILE, CREATE_MESSAGE, EDIT_USER, GET_ERRORS } from "./types";

export const editPerfil = (perfil, user) => async dispatch => {
  try {
    await axios.put(`/user/updateUser/${perfil.matricula}`, {
      ...perfil,
      ...user
    });

    dispatch({
      type: EDIT_PROFILE,
      payload: perfil
    });

    dispatch({
      type: EDIT_USER,
      payload: user
    });

    dispatch({
      type: CREATE_MESSAGE,
      payload: { editPerfil: "Perfil editado com sucesso" }
    });
  } catch (e) {
    const error = {
      msg: e.response.data,
      status: e.response.status
    };
    dispatch({
      type: GET_ERRORS,
      payload: error
    });
  }
};
