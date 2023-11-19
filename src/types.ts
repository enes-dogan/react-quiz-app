export type QuestionsType = {
  // id: 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'q7'; //* Literal type
  id: `q${number}`; // Template literal type
  text: string;
  answers: [string, string, string, string]; // Tuple
}[];

export interface QuestionProps {
  index: number;
  onSelectAnswer: (selectedAnswer: string | null) => void;
  onSkipAnswer: () => void;
}
export interface answerStateType {
  selectedAnswer: string;
  isCorrect: boolean | null;
}

export interface QuestionTimerProps {
  timeout: number;
  mode: string;
  onTimeout: (() => void) | null;
}

export interface AnswersProps {
  answers: string[];
  selectedAnswer: string;
  answerState: string;
  onSelect: (answer: string) => void;
}
