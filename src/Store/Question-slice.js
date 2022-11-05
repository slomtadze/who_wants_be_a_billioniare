import { createSlice } from "@reduxjs/toolkit";

const questionSlice = createSlice({
  name: "question",
  initialState: {
    questionText: "",
    answers: [{}, {}, {}, {}],
  },
  reducers: {
    setQuestionReducer(state, action) {
      state.questionText = action.payload;
    },
    setAnswersReducer(state, action) {
      state.answers = action.payload;
    },
  },
});

export const { setQuestionReducer, setAnswersReducer } = questionSlice.actions;
export default questionSlice.reducer;
