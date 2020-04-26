import keymirror from "keymirror";

export const ActionType = keymirror({
  SET_RECORDING: null,
  REMOVE_RECORDING: null,
});

export const setRecording = (details) => {
  return (dispatch) => {
    dispatch({ type: ActionType.SET_RECORDING, payload: details });
  };
};

export const removeRecording = (details) => {
  return (dispatch) => {
    dispatch({ type: ActionType.REMOVE_RECORDING, payload: details });
  };
};
