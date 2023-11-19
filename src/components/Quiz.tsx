import { useState, useCallback } from 'react';

import QuestionTimer from './QuestionTimer';

import { answerStateType } from '../types';

import QUESTIONS from '../questions';
import quizCompleteImg from '../assets/quiz-complete.png';

function Quiz() {
  const [answerState, setAnswerState] = useState<answerStateType>('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer: string | null) => {
      setAnswerState('answered');
      setUserAnswers(prevUserAnswers => {
        return [...prevUserAnswers, selectedAnswer!];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState('correct');
          setTimeout(() => setAnswerState(''), 2000);
        } else {
          setAnswerState('wrong');
          setTimeout(() => setAnswerState(''), 2000);
        }
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed.</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10_000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map(answer => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = '';

            if (answerState === 'answered' && isSelected) {
              cssClass = 'selected';
            }

            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
              cssClass = answerState;
            }
            return (
              <li className="answer" key={answer}>
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default Quiz;
