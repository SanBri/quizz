import axios from "axios";
import { GET_QUESTIONS, ADD_QUESTION, QUESTION_ERROR } from "./types";
import { setAlert } from "./alert";

export const getQuestion =
  (questionsCategory, questionsNumber) => async (dispatch) => {
    try {
      let res = await axios.get(
        `${process.env.URL}/question/${questionsCategory}/${questionsNumber}`
      );
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: QUESTION_ERROR,
        payload: {
          msg: err.response,
          status: err.response,
        },
      });
    }
  };

export const addQuestion =
  (formData, id, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let res;
      if (!edit) {
        res = await axios.post(`${process.env.URL}/question`, formData, config);
        dispatch({
          type: ADD_QUESTION,
          payload: res.data,
        });
        dispatch(setAlert("L'article a bien été créé", "success"));
      } else {
        res = await axios.put(
          `${process.env.URL}/question/${id}`,
          formData,
          config
        );
      }
    } catch (err) {
      dispatch({
        type: QUESTION_ERROR,
        payload: {
          msg: err.response,
          status: err.response,
        },
      });
    }
  };
