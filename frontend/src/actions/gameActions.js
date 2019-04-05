import axios from "../config/api";
import { GET_GAMES } from "./types";

export const getGames = () => async dispatch => {
  try {
    const { data } = await axios.get("/game");

    dispatch({
      type: GET_GAMES,
      payload: data
    });
  } catch (e) {
    console.log(e.response.data);
  }
};
