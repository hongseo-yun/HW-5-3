import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API = "https://6910cb5a7686c0e9c20bb7c5.mockapi.io/Tasks";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await fetch(`${API}/${id}`, { method: 'DELETE' });
        fetchTasks(); 
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Task List</h2>
        <Link to="/create" className="btn btn-primary">Add New Task</Link>
      </div>

      <div className="row">
        {tasks.map(task => (
          <div key={task.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header font-weight-bold">
                {task.title}
              </div>
              <div className="card-body">
                <p className="card-text"><strong>마감일:</strong> {task.dueDay}</p>
                <p className="card-text text-truncate"><strong>내용:</strong> {task.detail}</p>
                <p className={`card-text ${task.finish === 'Yes' ? 'text-success' : 'text-danger'}`}>
                  <strong>완료:</strong> {task.finish}
                </p>
                <p className="card-text"><strong>우선순위:</strong> {task.priority}</p>
                <p className="card-text"><strong>카테고리:</strong> {task.category}</p>
                
                <div className="mt-3">
                  <button onClick={() => navigate(`/update/${task.id}`)} className="btn btn-primary btn-sm me-2" style={{ marginRight: '5px' }}>
                    Modify
                  </button>
                  <button onClick={() => navigate(`/detail/${task.id}`)} className="btn btn-info btn-sm me-2" style={{ marginRight: '5px' }}>
                    Detail
                  </button>
                  <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;