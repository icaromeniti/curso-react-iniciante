import React, { useState } from "react";
import "./styles.css";

import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";

/*a função chamada "generateId , sempre sera utilizada com "idAcc"*/
let idAcc = 0;
const generateId = () => {
  idAcc = idAcc + 1;
  return idAcc;
};

export default function App() {
  /*container para guardar as tarefas */
  const [tasks, setTasks] = useState([]);

  /*dentro da função "addTask" , ela recebe 2 parametros que sao,
  "title, state" da tarefa */
  const addTask = (title, state) => {
    console.log("funcao sendo chamda em App");

    /*estou declarando uma nova tarefa chamada "newTask" */
    const newTask = {
      /*"generateId, vai garantir que a gente tem "idAcc" para cada tarefa */
      id: generateId(),
      title,
      state
    };
    setTasks((existingTasks) => {
      /*retornando uma nova lista */
      return [...existingTasks, newTask];
    });
  };

  const updateTask = (id, title, state) => {
    setTasks((existingTasks) => {
      return existingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTasks((existingTasks) => {
      return existingTasks.filter((task) => task.id !== id);
    });
  };

  /* CODIGOS PARA TAREFAS */
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="Pendente"
          onAddTask={addTask}
          taskState="Pendente"
          tasks={tasks.filter((t) => t.state === "Pendente")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Fazendo"
          onAddTask={addTask}
          taskState="Fazendo"
          tasks={tasks.filter((t) => t.state === "Fazendo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Completa"
          onAddTask={addTask}
          taskState="Completa"
          tasks={tasks.filter((t) => t.state === "Completa")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
  );
}
