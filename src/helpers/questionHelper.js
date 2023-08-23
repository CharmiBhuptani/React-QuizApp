import React, { createContext, useContext, useState } from 'react';

import baseData from '../assets/quiz.json';

const QuestionContext = createContext(null);

export const QuestionProvider = ({ children }) => {
    const [questionNo, setQuestionNo] = useState(0)
    const [score, setScore] = useState(0)
    const initAnswers = baseData.map(ques => { return { id: ques.id, answer: '' } })
    const [answers, setAnswers] = useState(initAnswers)

    const prevQuestion = () => {
        setQuestionNo((no) => no - 1)
    }

    const nextQuestion = () => {
        setQuestionNo((no) => no + 1)
    }

    const resetQuestion = () => {
        setAnswers(initAnswers)
        setQuestionNo(0)
    }

    return (
        <QuestionContext.Provider value={
            {
                data: baseData,
                answers: answers,
                questionNo,
                totalScore: baseData.length,
                score: score, 
                setScore,
                setAnswers,
                prevQuestion,
                nextQuestion,
                resetQuestion
            }}>
            {children}
        </QuestionContext.Provider>

    )
}

export const useQuestion = () => {
    return useContext(QuestionContext);
}