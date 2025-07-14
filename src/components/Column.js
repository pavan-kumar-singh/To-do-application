// components/Column.js
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';

function Column({ status, tasks, ...props }) {
  const renderTasks = tasks
    .filter((t) => t.status === status)
    .map((task) => (
      <TaskCard key={task.id} task={task} {...props} />
    ));

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData('id');
        props.changeStatus(Number(id), status);
      }}
    >
      <h2 className="section-button">{status[0].toUpperCase() + status.slice(1)}</h2>

      <AnimatePresence>{renderTasks}</AnimatePresence>
    </div>
  );
}

export default Column;
