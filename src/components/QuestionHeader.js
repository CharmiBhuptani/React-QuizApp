import React from "react";

function QuestionHeader(props) {
  // console.log(props);
  return (
    <div className="question-header">
      <label className="question rank">{props.questionRank}</label>
      <label className="score">{props.score}</label>
      <label className="timer">
        {props.timer} <sec>Seconds</sec>
      </label>
    </div>
  );
}

export default React.memo(QuestionHeader);
