import { combineReducers } from "redux";
import userInfoReducer from "./userInfo/slice";

const rootReducer = combineReducers({
  userInfoReducer,
});

export default rootReducer;
