import React, { useState, useEffect } from "react";
import { create } from "zustand";
import { motion } from "framer-motion";

// Zustand store for task management
const useTaskStore = create((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  addTask: (task) => set((state) => {
    const updatedTasks = [...state.tasks, task];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return { tasks: updatedTasks };
  }),
  removeTask: (index) => set((state) => {
    const updatedTasks = state.tasks.filter((_, i) => i !== index);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return { tasks: updatedTasks };
  }),
}));

const DailyFocusPlanner = () => {
  const { tasks, addTask, removeTask } = useTaskStore();
  const [newTask, setNewTask] = useState("");
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
      <h1 className="text-4xl font-extrabold drop-shadow-lg animate-bounce">Daily Focus Planner</h1>
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          placeholder="Enter task..."
          className="p-3 border rounded-lg text-black shadow-lg focus:ring-2 focus:ring-pink-300"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={() => {
            if (newTask) {
              addTask(newTask);
              setNewTask("");
            }
          }}
          className="p-3 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-400"
        >
          Add Task
        </button>
      </div>

      <ul className="mt-6 w-1/2 space-y-3">
        {tasks.map((task, index) => (
          <motion.li
            key={index}
            className="p-3 bg-white text-black rounded-lg shadow-lg flex justify-between items-center mt-2 hover:scale-105 transform transition"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            {task}
            <button onClick={() => removeTask(index)} className="text-red-600 hover:text-red-400">✖</button>
          </motion.li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold animate-pulse">Focus Timer</h2>
        <div className="text-3xl font-extrabold mt-2 bg-white text-black p-4 rounded-lg shadow-lg">
          {formatTime(timeLeft)}
        </div>
        <div className="mt-4 space-x-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-400"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={() => {
              setTimeLeft(1500);
              setIsRunning(false);
            }}
            className="p-3 bg-gray-700 text-white font-bold rounded-lg shadow-lg hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};


export default DailyFocusPlanner;