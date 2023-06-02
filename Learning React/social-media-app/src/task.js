
export const Task = ({ task, id, deleteTask, completeTask, completed }) => {
    return (
      <li className={completed ? "completed" : ""}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => completeTask(id)}
        />
        {task}
        <button className="delete" onClick={() => deleteTask(id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </li>
    );
  };