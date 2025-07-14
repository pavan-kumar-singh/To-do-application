// components/TaskCard.js
import React from "react";
import { motion } from "framer-motion";

function TaskCard({
  task,
  editingId,
  editText,
  setEditText,
  editTask,
  saveTask,
  deleteTask,
  changeStatus,
  setEditingId,
}) {
  const overdue = new Date(task.dueDate) < new Date();

  return (
    <motion.div
      className={`task-card ${
        task.status === "completed" ? "completed-task" : ""
      }`}
      draggable
      onDragStart={(e) => e.dataTransfer.setData("id", task.id)}
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <div className="task-header">
        <span className="category">{task.category}</span>
        <span
  className={`due 
    ${overdue && task.status !== 'completed' ? 'overdue' : ''} 
    ${task.status === 'completed' ? 'completed-date' : ''}`}
>
  {task.status === 'completed' ? '✔ ' : ''}
  {new Date(task.dueDate).toLocaleDateString()}
</span>

      </div>

      {editingId === task.id ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <div className="buttons">
            <button onClick={() => saveTask(task.id)}>Save</button>
          </div>
        </>
      ) : (
        <>
          <span className="task-text">{task.text}</span>
          <div className="buttons">
            {task.status !== "completed" && (
              <button
                onClick={() =>
                  changeStatus(
                    task.id,
                    task.status === "todo" ? "ongoing" : "completed"
                  )
                }
              >
                {task.status === "todo" ? "Start" : "Complete"}
              </button>
            )}
            <button onClick={() => editTask(task.id)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default TaskCard;
