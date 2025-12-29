import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { resolvePath,getFirstPathFromMenus } from '../routeMap'
import { fetchUsers } from '../Services/UserApi';
import { fetchProjects } from '../Services/ProjectsApi';
import { fetchMenusByUser } from '../Services/SideMenuApi';
import "./DefaultDropdown.css";
export default function DefaultDropdown({ projects: initialProjects = [], onSelectProject, onSelectUser }){
  const [project, setProject] = useState('')
  const [projects, setProjects] = useState(initialProjects)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    // prefer passed-in projects, otherwise fetch
    if(initialProjects.length === 0){
      fetchProjects().then((p)=>{ setProjects(p); setProject(p[0]?.name || '') })
    } else {
      setProject(initialProjects[0]?.name || '')
    }

    // fetch users for selection
   fetchUsers()
      .then(response => {
        setUsers(response.data); // ✅ API response array
      })
      .catch(error => {
        console.error("Error fetching users", error);
        setUsers([]);
      });
  },[initialProjects])

 function handleProceed() {
  // propagate selected project
  if (onSelectProject) onSelectProject(project);

  const selectedUser = users.find(uu => uu.userCode === user);
  const userLabel = selectedUser?.label || user;

  setLoading(true);

  fetchMenusByUser(user)
    .then(menus => {
      if (!Array.isArray(menus) || menus.length === 0) {
        console.warn("No menus returned for user:", user);
        return;
      }

      const menusObj = {
        main: menus,
        quick: []
      };

      console.log("menusObj:", menusObj);

      // notify parent ONCE with menus
      if (onSelectUser) {
        onSelectUser(user, userLabel, menusObj);
      }

      const to = getFirstPathFromMenus(menus);
      navigate(to, { state: { user, userLabel } });
    })
    .finally(() => setLoading(false));
}


  return (
    <div style={{padding:24}}>
      <h2>Please select project and user</h2>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 12 }}>
              <label>User</label>
             
             <select
  value={user}
  onChange={e => setUser(e.target.value)}
  disabled={loading}
  style={{ display: 'block', marginTop: 8, padding: 8 }}
>
  <option value="">Select User</option>
  {users.map(u => (
    <option key={u.id} value={u.userCode}>
      {u.userName}
    </option>
  ))}
</select>

              <button className="btn-primary" onClick={handleProceed} style={{ height: 40, alignSelf: 'flex-end' }} disabled={loading}>
                {loading ? <span className="spinner" aria-hidden="true"></span> : 'Proceed'}
              </button>
      </div>
    </div>
  )
}
