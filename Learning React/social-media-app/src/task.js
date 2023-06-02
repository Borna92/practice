
export const Task = ({ task, id, deleteTask, completeTask, completed }) => {
    return (
      <li>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => completeTask({ id })}
        />
        <span className={completed ? "completed" : ""}>{task}</span>
        <button className="delete" onClick={() => deleteTask(id)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </li>
    );
  };