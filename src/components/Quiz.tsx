import { useState, useCallback } from 'react';
import { answerStateType } from '../types';

import Question from './Question.tsx';
import QUESTIONS from '../questions.ts';
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

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex + 1}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}

export default Quiz;
