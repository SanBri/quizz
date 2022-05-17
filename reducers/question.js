import {
  ADD_QUESTION,
  GET_QUESTIONS,
  QUESTION_ERROR,
  EDIT_QUESTION,
} from "../actions/types";

const initialState = {
  questions: [],
  question: null,
  loading: true,
  error: {},
};

const QuestionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: payload,
        loading: false,
      };
    case ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, payload],
        loading: false,
      };
    case EDIT_QUESTION:
      return {
        ...state,
        question: payload,
        loading: false,
      };
    case QUESTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default QuestionReducer;
