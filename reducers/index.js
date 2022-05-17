import { combineReducers } from "redux";

import QuestionReducer from "./question";
import CategoryReducer from "./category";
import AlertReducer from "./alert";
import authReducer from "./auth";

export default combineReducers({
  QuestionReducer,
  CategoryReducer,
  AlertReducer,
  authReducer,
});
