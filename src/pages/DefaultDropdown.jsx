import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { fetchProjects, fetchUsers, fetchMenusByUser } from '../api'
import { resolvePath, getFirstPathFromMenus } from '../routeMap'

export default function DefaultDropdown({ projects: initialProjects = [], onSelectProject, onSelectUser }){
  const [project, setProject] = useState('')
  const [projects, setProjects] = useState(initialProjects)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState('')
  const [userLoadError, setUserLoadError] = useState('')
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    // prefer passed-in projects, otherwise fetch
    // if parent provided projects, use them; otherwise leave empty and let pages that need projects fetch explicitly
    if(initialProjects.length > 0){
      setProjects(initialProjects)
      setProject(initialProjects[0]?.name || '')
    }

    // fetch users for selection
    setUserLoadError('')
    setLoadingUsers(true)
    fetchUsers().then(u => { setUsers(u); setUser(u[0]?.userCode || '') }).catch(err => {
      console.error('Error loading users', err)
      setUserLoadError('Failed to load users. Please try again later.')
      setUsers([])
      setUser('')
    }).finally(()=> setLoadingUsers(false))
  },[initialProjects])

  function handleProceed(){
    // propagate selected project to app header
    if(onSelectProject) onSelectProject(project)

    // if consumer provided onSelectUser, notify about selected user
    const selectedUser = users.find(uu => uu.userCode === user)
    const userLabel = selectedUser?.label || user
    if(onSelectUser) onSelectUser(user, userLabel)

    // fetch menus for the user, update app state via onSelectUser, and redirect to the first available menu
    setLoading(true)
    fetchMenusByUser(user).then(menus => {
      // normalize menus into { main: [], quick: [] } if API returned array
      let menusObj = menus
      if(Array.isArray(menus)){
        const main = menus.filter(m => !m.isquickMenu)
        const quick = menus.filter(m => m.isquickMenu)
        menusObj = { main, quick }
      }
      // allow parent to receive fetched menus and update app-level state
      if(onSelectUser) onSelectUser(user, userLabel, menusObj)
      const to = getFirstPathFromMenus(menus)
      navigate(to, { state: { user: user, userLabel } })
    }).finally(()=> setLoading(false))
  }

  return (
    <div style={{padding:24}}>
      <h2>Please select user to proceed</h2>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
              <label>User</label>
              <select value={user} onChange={e => setUser(e.target.value)} style={{ display: 'block', marginTop: 8, padding: 8 }} disabled={loading || loadingUsers || !!userLoadError}>
                {users.map(u => <option key={u.userCode} value={u.userCode}>{u.label} ({u.userCode})</option>)}
              </select>
              <button className="btn-primary" onClick={handleProceed} style={{ height: 40, alignSelf: 'flex-end' }} disabled={loading || loadingUsers || !!userLoadError || users.length===0}>
                {loading ? <span className="spinner" aria-hidden="true"></span> : 'Proceed'}
              </button>
              
              {userLoadError && <div style={{ color: 'red', marginLeft: 12 }}>{userLoadError}</div>}
      </div>
    </div>
  )
}
