import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";

import Navbar from "../components/Navbar";
import Controller from "../components/Controller";
import Question from "../components/Question";
import StatusBar from "../components/StatusBar";
import { useQuestion } from "../helpers/questionHelper";
import selectAudio from "../assets/audio/click.mp3";
import QuestionHeader from "../components/QuestionHeader";

function QuestionPage(props) {
  const [play] = useSound(selectAudio);
  const navigate = useNavigate();

  const {
    data,
    setScore,
    answers,
    setAnswers,
    questionNo,
    prevQuestion,
    nextQuestion,
    totalScore,
    score,
  } = useQuestion();

  const [question, setQuestion] = useState(data[questionNo]);
  const [givenAnswer, setGivenAnswer] = useState(answers[questionNo].answer);
  const [timer, setTimer] = useState(30);


  const modifyAnswer = (no, ans) => {
    setAnswers((answers) =>
      answers.map((que) => {
        if (que.id === no) return { ...que, answer: ans };
        return que;
      })
    );
  };

  const optionHandler = (e) => {
    setGivenAnswer(e.target.value);
    modifyAnswer(question.id, e.target.value);
  };

useEffect(() => {
  // Reset the question and answer when the question number changes
  setQuestion(data[questionNo]);
  setGivenAnswer(answers[questionNo].answer);

  // Reset timer to 30 seconds every time the question changes
  setTimer(30);

  // Auto-advance code
  const autoAdvance = setTimeout(() => {
    if (questionNo !== data.length - 1) {
      nextHandler();
    } else {
      finishHandler();
    }
  }, 30000); // Set timeout for 30 seconds

  // Button enabling/disabling
  if (answers[questionNo].answer.length === 0)
    document
      .querySelectorAll('[name="answer"]')
      .forEach((btn) => (btn.disabled = false));
  if (answers[questionNo].answer.length > 0)
    document
      .querySelectorAll('[name="answer"]')
      .forEach((btn) => (btn.disabled = true));

  
  calculateScore();
  // Clear the timeout when the component is unmounted or when the question changes
  return () => clearTimeout(autoAdvance);
}, [questionNo]);

  const prevHandler = () => {
    if (questionNo === 0) return;
    play();
    calculateScore();
    prevQuestion();
  };

  const nextHandler = () => {
    if (questionNo === data.length - 1) return;
    play();
    calculateScore();
    nextQuestion();
  };

  const skipHandler = () => {
    if (questionNo === data.length - 1) return;
    play();
    calculateScore();
    nextQuestion();
  };

  const width = () => {
    return ((questionNo + 1) * 100) / data.length + "%";
  };

  const calculateScore = () => {
    const score = answers.reduce((acc, curr, i) => {
      if (curr.answer === data[i].answer) return acc + 1;
      else return acc;
    }, 0);
    setScore(score);
  };

  const finishHandler = () => {
    calculateScore();
    // play();
    props.context.suspend();
    navigate("/score", { replace: true });
  };
  useEffect(() => {
    // Update timer every second
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Clear interval when the component is unmounted or when the question or timer changes
    return () => clearInterval(intervalId);
  }, [questionNo, timer]);

  return (
    <>
      <Navbar />
      <QuestionHeader
        questionRank={`${questionNo + 1}/${data.length}`}
        score={score}
        timer={timer}
      />

      <Question
        question={question}
        answer={givenAnswer}
        optionHandler={optionHandler}
      />

      <Controller
        last={questionNo === data.length - 1}
        prevDisable={questionNo === 0}
        nextDisable={!givenAnswer.length || questionNo === data.length - 1}
        finishHandler={finishHandler}
        skipHandler={skipHandler}
        nextHandler={nextHandler}
        prevHandler={prevHandler}
      />

      <StatusBar percent={width()} />
    </>
  );
}

export default React.memo(QuestionPage);
