import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { validateMenuForUser } from '../api'
import { resolvePath } from '../routeMap'
import { FaHome, FaPlus, FaList, FaUpload, FaChartBar } from 'react-icons/fa'

export default function Sidebar({ menus = {}, onSelect, userCode }) {
  const loc = useLocation()
  const navigate = useNavigate()

  // use central routeMap resolvePath

  // When on the root path (several variants), render minimal sidebar (brand only)
  const path = loc.pathname || ''
  function goHome(){
    navigate('/')
  }

  function onBrandKey(e){
    if(e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
      e.preventDefault()
      goHome()
    }
  }

  if(path === '/' || path === '' || path.endsWith('/index.html')){
    return (
      <aside className="sidebar">
        <div className="brand" role="button" tabIndex={0} onClick={goHome} onKeyDown={onBrandKey}>SOBHA constructions</div>
      </aside>
    )
  }

  async function handleClick(m){
    const to = m.url || resolvePath(m.id)
    const ok = await validateMenuForUser(userCode, m.id)
    const state = { menuLabel: m.label }
    if(userCode) state.user = userCode
    if(typeof m === 'object' && m.label) state.menuLabel = m.label
    if(typeof m !== 'undefined' && typeof m.id !== 'undefined') state.menuId = m.id
    if(ok){
      navigate(to, { state })
    } else {
      navigate('/404')
    }
  }

  function handleKeyDown(e, m){
    // activate on Enter or Space
    if(e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
      e.preventDefault()
      handleClick(m)
    }
  }

  return (
    <aside className="sidebar">
      <div className="brand" role="button" tabIndex={0} onClick={goHome} onKeyDown={onBrandKey}>SOBHA constructions</div>
      <nav>
        {/* default landing menu */}
        <div className={`nav-item ${loc.pathname === '/' ? 'active' : ''}`} role="button" tabIndex={0} onClick={() => navigate('/')} onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '||e.key==='Spacebar'){ e.preventDefault(); navigate('/') } }}>
          <span className="icon">{getIconComponent('home')}</span>
          <span className="label">Home</span>
        </div>
        {menus.main && menus.main.map((m) => {
          const to = m.url || resolvePath(m.id)
          const active = loc.pathname === to
          return (
            <div
              key={m.id}
              onClick={() => handleClick(m)}
              onKeyDown={(e) => handleKeyDown(e, m)}
              role="button"
              tabIndex={0}
              aria-current={active ? 'page' : undefined}
              className={`nav-item ${active ? 'active' : ''}`}
            >
              <span className="icon">{getIconComponent(m.icon)}</span>
              <span className="label">{m.label}</span>
            </div>
          )
        })}
      </nav>

      <div className="quick">QUICK ACTIONS</div>
      <nav>
        {menus.quick && menus.quick.map((m) => (
          <div
            key={m.id}
            className="nav-item small"
            onClick={() => handleClick(m)}
            onKeyDown={(e) => handleKeyDown(e, m)}
            role="button"
            tabIndex={0}
          >
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
