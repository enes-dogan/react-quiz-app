import { useState } from 'react';
import { QuestionProps } from '../types.ts';
import { answerStateType } from '../types.ts';

import Answers from './Answers.tsx';
import QuestionTimer from './QuestionTimer.tsx';
import QUESTIONS from '../questions.ts';

function Question({ index, onSelectAnswer, onSkipAnswer }: QuestionProps) {
  const [answer, setAnswer] = useState<answerStateType>({
    selectedAnswer: '',
    isCorrect: null,
  });

  function handleSelectAnswer(answer: string) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer timeout={10_000} onTimeout={onSkipAnswer} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

export default Question;
