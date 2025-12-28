import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../api';
 import  './DefaultDropdown.css';

export default function DefaultDropdown() {
  const [role, setRole] = useState('user');
  const [project, setProject] = useState('');
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects().then((p) => {
      setProjects(p);
      setProject(p[0]?.name || '');
    });
  }, []);

  function handleProceed() {
    if (role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/reports');
    }
  }

  return (
    <div className="selection-container">
      <h2 className="title">Please select role and project</h2>

      <div className="form-row">
        <div className="form-group">
          <label className="label">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="select-box"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="form-group">
          <label className="label">Project</label>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="select-box"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button className="primary-btn" onClick={handleProceed}>
          Proceed
        </button>
      </div>
    </div>
  );
}
