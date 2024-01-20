import axios from "axios";
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";

// ❗ You don't need to add extra action creators to achieve MVP
export const moveClockwise = () => ({ type: MOVE_CLOCKWISE });
export const moveCounterClockwise = () => ({ type: MOVE_COUNTERCLOCKWISE });

export function selectAnswer(payload) {
  return { type: SET_SELECTED_ANSWER, payload };
}

export function setMessage(payload) {
  return { type: SET_INFO_MESSAGE, payload };
}

export function setQuiz(payload) {
  return { type: SET_QUIZ_INTO_STATE, payload };
}

export function inputChange({ id, value }) {
  return { type: INPUT_CHANGE, payload: { id, value } };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state
    // (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(null));
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        // On successful GET
        // Dispatch an action to send the obtained quiz to its state
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
export function postAnswer(payload) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer", payload)
      .then((res) => {
        // On successful POST
        // - Dispatch an action to reset the selected answer state
        // - Dispatch an action to set the server message to state
        // - Dispatch the fetching of the next quiz
        dispatch(selectAnswer(null));
        dispatch(setMessage(res.data.message));
        dispatch(fetchQuiz());
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
export function postQuiz(payload) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios
      .post("http://localhost:9000/api/quiz/new", payload)
      .then((res) => {
        const question = res.data.question;
        const message = `Congrats: "${question}" is a great question!`;
        dispatch(setMessage(message));
        dispatch(resetForm());
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
