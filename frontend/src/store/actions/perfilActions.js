import axios from "../../services/api";

import { EDIT_PROFILE, CREATE_MESSAGE } from "./types";

export const editPerfil = perfil => async dispatch => {
  try {
    await axios.put(`/user/updateUser/${perfil.matricula}`, { ...perfil });

    dispatch({
      type: EDIT_PROFILE,
      payload: perfil
    });

    dispatch({
      type: CREATE_MESSAGE,
      payload: { editPerfil: "Perfil editado com sucesso" }
    });
    //   dispatch(getRegras(regra.tb_game_id));
  } catch (e) {
    console.log(e.response.data);
  }
};
