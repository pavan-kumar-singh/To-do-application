// components/TaskInput.js
import React from 'react';

function TaskInput({ taskInput, setTaskInput, dueDate, setDueDate, category, setCategory, categories, addTask }) {
  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default TaskInput;
