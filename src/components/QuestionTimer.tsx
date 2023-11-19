import { useState, useEffect } from 'react';

import { QuestionTimerProps } from '../types';

function QuestionTimer({ timeout, onTimeout }: QuestionTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  console.log('QuestionTimer rendered');
  useEffect(() => {
    console.log('setTimeout called');
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    console.log('setInterval called');
    const interval = setInterval(() => {
      setRemainingTime(prevRemainingTime => {
        return prevRemainingTime - 100;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}

export default QuestionTimer;
