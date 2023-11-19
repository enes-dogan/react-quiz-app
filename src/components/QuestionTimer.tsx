import { useState, useEffect } from 'react';
import { QuestionTimerProps } from '../types';

function QuestionTimer({ timeout, mode, onTimeout }: QuestionTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  useEffect(() => {
    const timer = setTimeout(onTimeout!, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prevRemainingTime => {
        return prevRemainingTime - 100;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress
    id="question-time"
    className={mode}
    max={timeout}
    value={remainingTime}
  />;
}

export default QuestionTimer;
