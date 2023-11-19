export type QuestionsType = {
  // id: 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'q7'; //* Literal type
  id: `q${number}`; // Template literal type
  text: string;
  answers: [string, string, string, string]; // Tuple
}[];

export type answerStateType = 'answered' | 'correct' | 'wrong' | '';

export interface QuestionTimerProps {
  timeout: number;
  onTimeout: () => void;
}
