import React, { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import Column from './components/Column';

function App() {
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('General');
  const categories = ['General', 'Work', 'Personal', 'Urgent'];
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks'));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskInput.trim() || !dueDate) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskInput,
        dueDate,
        category,
        status: 'todo',
      },
    ]);
    setTaskInput('');
    setDueDate('');
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const editTask = (id) => {
    const t = tasks.find(t => t.id === id);
    setEditingId(id);
    setEditText(t.text);
  };
  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem('tasks');
  };
  
  const saveTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: editText } : t));
    setEditingId(null);
  };
  const changeStatus = (id, newStatus) =>
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));

  const filteredTasks = tasks.filter(t =>
    filter === 'All' || t.category === filter
  );

  return (
    <div className="app">
      <h1>To‑Do Application</h1>

      <TaskInput
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        dueDate={dueDate}
        setDueDate={setDueDate}
        category={category}
        setCategory={setCategory}
        categories={categories}
        addTask={addTask}
      />

<div className="filters">
  <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
  {categories.map((c) => (
    <button
      key={c}
      className={filter === c ? 'active' : ''}
      onClick={() => setFilter(c)}
    >
      {c}
    </button>
  ))}
  <button className="filter-btn clear-btn" onClick={clearAllTasks}>Clear All Tasks</button>
</div>


      <div className="columns">
        {['todo', 'ongoing', 'completed'].map(status => (
          <Column
            key={status}
            status={status}
            tasks={filteredTasks}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            editTask={editTask}
            saveTask={saveTask}
            deleteTask={deleteTask}
            changeStatus={changeStatus}
            setEditingId={setEditingId}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
