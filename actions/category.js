import axios from "axios";
import { GET_CATEGORIES, CATEGORY_ERROR } from "./types";

export const getCategory = () => async (dispatch) => {
  try {
    let res = await axios.get(`${process.env.URL}/category/`);
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: {
        msg: err.response,
        status: err.response,
      },
    });
  }
};
