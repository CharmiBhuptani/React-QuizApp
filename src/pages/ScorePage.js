import React, { useEffect, useState } from 'react'
import useSound from 'use-sound';

import Navbar from '../components/Navbar'
import { useQuestion } from '../helpers/questionHelper'
import resultAudio from '../assets/audio/result.mp3'
import scoreAudio from '../assets/audio/score.mp3'

function ScorePage(props) {

  const [playScore] = useSound(scoreAudio);
  const [play] = useSound(resultAudio);
  const { totalScore, score, answers } = useQuestion();

  const [audio, setAudio] = useState(true);
  const [x, setX] = useState(0);
  const [timer, setTimer] = useState(true);

  const tick = () => {
    setX(Math.floor(Math.random() * totalScore + 1));
  }

  useEffect(() => {

    setTimeout(() => {
      setAudio(false);
      props.context.resume();
    }, 1000);

    const interval = setInterval(() => tick(), 50);
    setTimeout(() => {
      clearInterval(interval);
      setTimer(false);
      props.context.resume();
      console.log(answers);
    }, 3000);

    return(() => {
      clearTimeout();
    });

  }, [])

  useEffect(() => {
    playScore()
  }, [audio])

  useEffect(() => {
    play()
  }, [timer])

  return (
    <div className='scorepage'>
      <Navbar />
      <div className='scoreContent'>
        <div className='scoreBox'>
          <p> You have scored </p>
          <span className='scores'> {timer ? x : score} </span>
          <p> out of </p>
          <span className='scores'> {totalScore} </span>
        </div>
        <div className='scoreImg'>
          <img src={require(`../assets/images/${timer ? 'gettingScore' : 'scoreBoard'}.png`)} alt="Trivia"></img>
        </div>
      </div>
    </div>
  )
}

export default ScorePage