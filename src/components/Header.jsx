import React from 'react';
import { useLocation } from 'react-router-dom'
import { FaSearch, FaUserCircle } from 'react-icons/fa'

export default function Header({ project, selectedUser }) {
  const location = useLocation()
  const showRight = location.pathname !== '/'

  return (
    <header className="header">
      <h1>Welcome to Project Control</h1>
      {showRight && (
        <div className="header-right">
          <div className="search">
            <span className="search-icon"><FaSearch /></span>
            <select value={project} readOnly>
              <option>{project}</option>
            </select>
          </div>
          {selectedUser && <div className="user">{selectedUser}</div>}
          <div className="avatar"><FaUserCircle size={20} /></div>
        </div>
      )}
    </header>
  );
}
