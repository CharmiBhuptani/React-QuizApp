import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';

import Button from '../components/Button';
import { useQuestion } from '../helpers/questionHelper';
import startAudio from '../assets/audio/click.mp3';
import Login from '../components/Login';

function HomePage(props) {
  const [play] = useSound(startAudio);

  const navigate = useNavigate()
  const { resetQuestion } = useQuestion();

  const startHandler = () => {
    props.context.resume();
    play();
    resetQuestion();
    navigate('question');
  }

  return (
    <div className="homepage">
      <div className="logo">
        <img src={require("../assets/images/logo.png")} alt="Trivia"></img>
      </div>
      <div className="content">
        <div className="textContent">
          <p className="funTitle">It's Trivia. This is going to be fun.</p>
          <p className="funText">
            Answer few questions. One can take help from Friends 😜.
          </p>

          <div className="start">
            <Button clickHandler={startHandler} btnName="Let's Begin" />
            <Login />
          </div>
        </div>

        <div className="image">
          <img
            src={require("../assets/images/questionmark.png")}
            alt="Question marks"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default HomePage;