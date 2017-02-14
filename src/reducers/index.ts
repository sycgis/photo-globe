import application from "./application";
import globe from "./globe";
import posts from './posts';
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  application,
  globe,
  posts,
  routing: routerReducer,
});
