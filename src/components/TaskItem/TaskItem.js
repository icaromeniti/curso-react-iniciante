import React, { useState } from "react";
import PropTypes from "prop-types";
import "./task-item.css";

export default function TaskItem({
  id,
  title,
  TaskState,
  onTaskUpdate,
  onDeleteTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);

  const ontitleChange = (event) => {
    const newTitle = event.target.value;
    setEditableTitle(newTitle);
    onTaskUpdate(id, newTitle, TaskState);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.lenght === 0) {
        onDeleteTask(id);
      }
    }
  };

  const onTaskStateChange = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };

  if (isEditing) {
    return (
      <div className="task-item">
        <input
          type="text"
          value={editableTitle}
          onChange={ontitleChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  } else {
    /*CODIGO PARA MUDAR O CLIK DA TABELA, "Pendente,Fazendo,Completa" */
    return (
      /*"<div className= "task-item">, deixa as tarefas com aspecto quadrado branco */
      <div className="task-item">
        <div onClick={(e) => setIsEditing(true)}>{editableTitle}</div>
        <select onChange={onTaskStateChange} value={TaskState}>
          <option value="Pendente">Pendente</option>
          <option value="Fazendo">Faaendo</option>
          <option value="Completa">Completa</option>
        </select>
      </div>
    );
  }
}

TaskItem.PropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  TaskState: PropTypes.string.isRequired
};
