import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

function TestTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/tasks/')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Tareas</h2>
      <ul className="list-group">
        {tasks.map(task => (
          <li className="list-group-item" key={task.id}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestTasks;
