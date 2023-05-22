import styles from './App.module.css'
import { useState } from 'react';

function App() {
  const [newTask, setNewTask] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  }

  const addTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      completed: false // Trạng thái hoàn thành ban đầu là false
    };
    setTodoList([...todoList, task]);
    setNewTask(""); // Xóa nội dung trong ô input sau khi thêm task
  }

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id))
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) { // Kiểm tra phím Enter được nhấn
      addTask(); // Thêm task
      event.preventDefault(); // Ngăn không cho form submit lại
    }
  }
  const completeTask = (id) => {
    setTodoList(todoList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: true }; // Cập nhật trạng thái hoàn thành của task
      }
      return task;
    }));
  }

  return (
    <div className={styles.App}>
      <div className='addTask'>
        <input onChange={handleChange} onKeyDown={handleKeyDown} value={newTask} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='list'>
        {todoList.map((task) => (
          <div key={task.id} style={{backgroundColor: task.completed ? 'green' : 'white'}}>
            <h2>{task.taskName}</h2>
            <button onClick={() => deleteTask(task.id)}>X</button>
            <button onClick={() => completeTask(task.id)}>Complete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
