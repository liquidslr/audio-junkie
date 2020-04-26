/* eslint-disable import/extensions */
import { combineReducers } from "redux";
import { RecordingReducer } from "../components/reducer";

export default combineReducers({
  recordings: RecordingReducer,
});
