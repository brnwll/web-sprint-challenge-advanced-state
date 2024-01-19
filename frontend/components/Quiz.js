import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuiz, postAnswer } from "../state/action-creators";

function Quiz(props) {
  const { quiz, fetchQuiz, postAnswer } = props;

  useEffect(() => {
    !quiz && fetchQuiz();
  }, []);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                {quiz.answers[0].text}
                <button>SELECTED</button>
              </div>

              <div className="answer">
                {quiz.answers[1].text}
                <button>Select</button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
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
    //selectedAnswer: state.selectedAnswer,
    //message: state.message,
  };
};

export default connect(mapStateToProps, { fetchQuiz, postAnswer })(Quiz);
