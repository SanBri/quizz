import { GET_CATEGORIES, CATEGORY_ERROR } from "../actions/types";

const initialState = {
  categories: [],
  loading: true,
  error: {},
};

const CategoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default CategoryReducer;
