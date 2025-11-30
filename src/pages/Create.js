import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API = "https://6910cb5a7686c0e9c20bb7c5.mockapi.io/Tasks";

const Create = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '', dueDay: '', detail: '', finish: 'No', priority: 'Low', category: ''
  });

  const titleRef = useRef(null);
  const dueDayRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      alert("Title is required!");
      titleRef.current.focus();
      return;
    }
    if (!formData.dueDay) {
      alert("Due Day is required!");
      dueDayRef.current.focus();
      return;
    }

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/list');
      }
    } catch (error) {
      console.error("Create failed:", error);
    }
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Title</label>
          <input 
            type="text" name="title" className="form-control" 
            ref={titleRef} 
            value={formData.title} onChange={handleChange} 
          />
        </div>
        <div className="form-group mb-3">
          <label>Due Day</label>
          <input 
            type="date" name="dueDay" className="form-control" 
            ref={dueDayRef} 
            value={formData.dueDay} onChange={handleChange} 
          />
        </div>
        <div className="form-group mb-3">
          <label>Detail</label>
          <input type="text" name="detail" className="form-control" value={formData.detail} onChange={handleChange} />
        </div>
        <div className="form-group mb-3">
          <label>Finish</label>
          <select name="finish" className="form-control" value={formData.finish} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label>Priority</label>
          <select name="priority" className="form-control" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label>Category</label>
          <input type="text" name="category" className="form-control" value={formData.category} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-success">Create</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/list')}>Cancel</button>
      </form>
    </div>
  );
};

export default Create;