import "./App.css";
import { useState } from "react";
import { Task } from "./task.js";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      task: newTask,
      completed: false,
    };
    setTodoList([...todoList, task]);
    setNewTask("");
  }

  function deleteTask(task) {
    setTodoList(todoList.filter((item) => item.id !== task));
  }

  function completeTask(task) {
    setTodoList((todoList) => 
      todoList.map((item) => 
        item.id === task.id ? {...item, completed: !item.completed } : item
      )
    )
  }

  return (
    <div className="App">
      <div className="addTask">
        <input type="text" onChange={handleChange} value={newTask} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="list">
        {todoList.map((item, key) => {
          return (
            <Task
              key={key}
              task={item.task}
              id={item.id}
              deleteTask={deleteTask}
              completeTask={completeTask}
              completed={item.completed}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
