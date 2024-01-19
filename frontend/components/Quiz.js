import React, { useEffect } from "react";
import { connect } from "react-redux";
import { selectAnswer, fetchQuiz, postAnswer } from "../state/action-creators";

function Quiz(props) {
  const { quiz, fetchQuiz, selectedAnswer, selectAnswer, postAnswer } = props;

  useEffect(() => {
    !quiz && fetchQuiz();
  }, []);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that,
        // otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={`answer ${
                  quiz.answers[0].answer_id === selectedAnswer && "selected"
                }`}
              >
                {quiz.answers[0].text}
                <button onClick={() => selectAnswer(quiz.answers[0].answer_id)}>
                  {quiz.answers[0].answer_id === selectedAnswer
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>

              <div
                className={`answer ${
                  quiz.answers[1].answer_id === selectedAnswer && "selected"
                }`}
              >
                {quiz.answers[1].text}
                <button onClick={() => selectAnswer(quiz.answers[1].answer_id)}>
                  {quiz.answers[1].answer_id === selectedAnswer
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
            </div>

            <button
              id="submitAnswerBtn"
              disabled={!selectedAnswer}
              onClick={() =>
                postAnswer({ quiz_id: quiz.quiz_id, answer_id: selectedAnswer })
              }
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
    //message: state.message,
  };
};

export default connect(mapStateToProps, {
  fetchQuiz,
  selectAnswer,
  postAnswer,
})(Quiz);
