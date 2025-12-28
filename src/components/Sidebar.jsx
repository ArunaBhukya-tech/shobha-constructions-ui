import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaPlus, FaList, FaUpload, FaChartBar } from 'react-icons/fa'

export default function Sidebar({ menus = {}, onSelect }) {
  const loc = useLocation()

  function resolvePath(id){
    switch(id){
      case 'dashboard': return '/dashboard'
      case 'new': return '/new'
      case 'view': return '/view'
      case 'bulk': return '/bulk'
      case 'reports': return '/reports'
      default: return '/' 
    }
  }

  return (
    <aside className="sidebar">
      <div className="brand">SOBHA constructions</div>
      <nav>
        {menus.main && menus.main.map((m) => {
          const to = resolvePath(m.id)
          const active = loc.pathname === to
          return (
            <Link key={m.id} to={to} className={`nav-item ${active ? 'active' : ''}`}>
              <span className="icon">{getIconComponent(m.icon)}</span>
              <span className="label">{m.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="quick">QUICK ACTIONS</div>
      <nav>
        {menus.quick && menus.quick.map((m) => (
          <div key={m.id} className="nav-item small">
            <span className="icon">{getIconComponent(m.icon)}</span>
            <span className="label">{m.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function getIconComponent(name){
  switch(name){
    case 'home': return <FaHome />
    case 'plus': return <FaPlus />
    case 'list': return <FaList />
    case 'upload': return <FaUpload />
    case 'bar': return <FaChartBar />
    default: return null
  }
}
