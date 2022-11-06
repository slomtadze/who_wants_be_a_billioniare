import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    startGameModal: true,
    stopGameModal: false,
    endGameModal: false,
  },
  reducers: {
    startGame(state) {
      state = {
        startGameModal: true,
        stopGameModal: false,
        endGameModal: false,
      };
    },
    stopGame(state) {
      state = {
        startGameModal: false,
        stopGameModal: true,
        endGameModal: false,
      };
    },
    endGame(state) {
      state = {
        startGameModal: false,
        stopGameModal: false,
        endGameModal: true,
      };
    },
  },
});

export const { setQuestionReducer, setAnswersReducer } = questionSlice.actions;
export default questionSlice.reducer;
