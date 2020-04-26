/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { ActionType } from "./actions";

const initialState = {
  recordings: {},
};

function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export function RecordingReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_RECORDING: {
      const id = action.payload[0];
      const user = action.payload[1];
      const recording = action.payload[2];
      const obj = initialState.recordings;

      if (isEmpty(obj[id])) {
        obj[id] = {};
      }
      obj[id][user] = recording;
      return {
        ...state,
        recordings: obj,
      };
    }

    case ActionType.REMOVE_RECORDING: {
      const id = action.payload[0];
      const user = action.payload[1];
      const obj = initialState.recordings;

      obj[id][user] = null;
      return {
        ...state,
        recordings: obj,
      };
    }

    default: {
      return state;
    }
  }
}
