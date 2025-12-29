import React from 'react';
import { FaThLarge, FaLayerGroup, FaBuilding, FaTasks, FaList, FaHome, FaCalendarAlt, FaTag, FaShieldAlt } from 'react-icons/fa'

export default function MetricCard({ item }) {
  return (
    <div className="metric-card">
      <div className="metric-left">
        <div className="metric-icon" style={{background: item.color}}>{getIcon(item.icon)}</div>
        <div>
          <div className="metric-value">{item.value}</div>
          <div className="metric-label">{item.label}</div>
        </div>
      </div>
    </div>
  );
}

function getIcon(name){
  switch(name){
    case 'grid': return <FaThLarge />
    case 'layers': return <FaLayerGroup />
    case 'building': return <FaBuilding />
    case 'tasks': return <FaTasks />
    case 'list': return <FaList />
    case 'home': return <FaHome />
    case 'calendar': return <FaCalendarAlt />
    case 'tag': return <FaTag />
    case 'shield': return <FaShieldAlt />
    default: return null
  }
}
