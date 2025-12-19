import React, { useState, useEffect, useRef } from 'react';

const PomodoroContainer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [streak, setStreak] = useState(0);
  const [minimal, setMinimal] = useState(false);
  const audioRef = useRef();

useEffect(() => {
  let timer = null;

  if (running && timeLeft > 0) {
    timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRunning(false);
          setStreak((prevStreak) => prevStreak + 1);
          if (audioRef.current) {
            audioRef.current.play();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return () => clearInterval(timer);
}, [running, timeLeft]);


  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setRunning(false);
  };

  const progressPercent = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="pomodoro-container">
      <audio ref={audioRef} src="/chime.mp3" />
      <div className="header">
        <h3>⏳ Pomodoro Session</h3>
        <button onClick={() => setMinimal(!minimal)}>
          {minimal ? 'Show All' : 'Minimal Mode'}
        </button>
      </div>

      <div className="timer-bar" style={{
        background: `linear-gradient(to right, #4caf50 ${progressPercent}%, #ccc ${progressPercent}%)`
      }}>
        <span>{formatTime(timeLeft)}</span>
      </div>

      {!minimal && (
        <>
          <div className="tasks">
            <h4>📝 Tasks</h4>
            <input
              type="text"
              placeholder="Add task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask}>Add</button>

            <ul>
              {tasks.map((task, i) => (
                <li
                  key={i}
                  onClick={() => setSelectedTask(task)}
                  className={task === selectedTask ? 'selected' : ''}
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>

          <div className="streak">
            🔥 Streak: {streak} Pomodoros
          </div>
        </>
      )}

      <div className="controls">
        <button onClick={() => setRunning(!running)}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      {selectedTask && <p className="current-task">🎯 Focusing on: {selectedTask}</p>}
    </div>
  );
};

export default PomodoroContainer;
