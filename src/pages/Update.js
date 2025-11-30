import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API = "https://6910cb5a7686c0e9c20bb7c5.mockapi.io/Tasks";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '', dueDay: '', detail: '', finish: '', priority: '', category: ''
  });
  
  const [changeCount, setChangeCount] = useState(0);

  const titleRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data));
  }, [id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    
    setChangeCount(prev => prev + 1);

    if (name === 'title' && value.trim() === '') {
        titleRef.current.focus(); 
        return; 
    }

    try {
      await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      console.log("Auto-saved!");
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  return (
    <div>
      <h2>Update Task (Auto-Save)</h2>
      <div className="alert alert-info">Total Changes: <strong>{changeCount}</strong></div>

      <form onSubmit={(e) => e.preventDefault()}>
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
          <input type="date" name="dueDay" className="form-control" value={formData.dueDay} onChange={handleChange} />
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

        <button className="btn btn-secondary mt-3" onClick={() => navigate('/list')}>
          Back to List
        </button>
      </form>
    </div>
  );
};

export default Update;