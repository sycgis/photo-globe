import application from "./application";
import globe from "./globe";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  application,
  globe,
  routing: routerReducer,
});
