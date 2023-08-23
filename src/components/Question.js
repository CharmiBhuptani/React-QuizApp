import React from 'react';
import Options from './Options';

const Question = (props) => {
    return (
      <div className="questionContent">
        <div className="questionContainer">
          <div className="question">{props.question.question}</div>
          <div className="optionContainer">
            <Options
              val={props.answer}
              optionHandler={props.optionHandler}
              className="options"
              options={props.question.option[0]}
            ></Options>
            <Options
              val={props.answer}
              optionHandler={props.optionHandler}
              className="options"
              options={props.question.option[1]}
            ></Options>
            <Options
              val={props.answer}
              optionHandler={props.optionHandler}
              className="options"
              options={props.question.option[2]}
            ></Options>
            <Options
              val={props.answer}
              optionHandler={props.optionHandler}
              className="options"
              options={props.question.option[3]}
            ></Options>
          </div>
        </div>

        <div className="questionImg">
          <img
            src={require(`../assets/images/${props.question.category}.png`)}
            alt="food"
          ></img>
        </div>
      </div>
    );
}

export default React.memo(Question)