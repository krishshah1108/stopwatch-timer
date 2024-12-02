import React, { useState, useEffect } from 'react';

const App = () => {
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // Start Timer
  const handleTimerStart = () => {
    setIsTimerStarted(true);

    const id = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    setIntervalId(id); // Store interval ID in state
  };

  // Stop Timer
  const handleTimerStop = () => {
    setIsTimerStarted(false);
    clearInterval(intervalId); // Clear interval when stopping
  };

  // Reset Timer
  const handleTimerReset = () => {
    setTime(0); // Reset time
    setIsTimerStarted(false); // Stop the timer
    clearInterval(intervalId);
    setIntervalId(null); // Clear interval when resetting
  };

  // Clean up interval on component unmount or when the timer is stopped
  useEffect(() => {
    // If timer is stopped, clean up interval
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <>
      <div className="container">
        <h1>Stopwatch Timer</h1>
        <h2>{time}</h2>
        <div className="buttons">
          {isTimerStarted ? (
            <>
              <button onClick={handleTimerStop}>Stop</button>
              <button onClick={handleTimerReset}>Reset</button>
            </>
          ) : intervalId ? (
            <>
              <button onClick={handleTimerReset}>Reset</button>
              <button onClick={handleTimerStart}>Start</button>
            </>
          ) : (
            <button onClick={handleTimerStart}>Start</button>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
