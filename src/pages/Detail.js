import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API = "https://6910cb5a7686c0e9c20bb7c5.mockapi.io/Tasks";

const Detail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then(res => res.json())
      .then(data => setTask(data));
  }, [id]);

  if (!task) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="card-header">Task Detail</div>
      <div className="card-body">
        <h3 className="card-title">{task.title}</h3>
        <p><strong>Due Day:</strong> {task.dueDay}</p>
        <p><strong>Detail:</strong> {task.detail}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Category:</strong> {task.category}</p>
        <p><strong>Finish:</strong> <span className={task.finish === 'Yes' ? 'text-success' : 'text-danger'}>{task.finish}</span></p>
        
        <Link to="/list" className="btn btn-primary">Back to List</Link>
        <Link to={`/update/${task.id}`} className="btn btn-warning ms-2">Edit</Link>
      </div>
    </div>
  );
};

export default Detail;