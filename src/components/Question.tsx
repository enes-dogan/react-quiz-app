import { QuestionProps } from '../types.ts';

import Answers from './Answers.tsx';
import QuestionTimer from './QuestionTimer.tsx';

function Question({
  questionText,
  answers,
  selectedAnswer,
  answerState,
  onSelectAnswer,
  onSkipAnswer,
}: QuestionProps) {
  return (
    <div id="question">
      <QuestionTimer timeout={10_000} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}

export default Question;
