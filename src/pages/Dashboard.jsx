import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchTablePreview } from '../Services/api'
import { fetchProjects } from '../Services/ProjectsApi'
import { fetchMetrics } from '../Services/Metrics'
import ProjectCard from '../components/ProjectCard'
import MetricCard from '../components/MetricCard'
import ProgressCard from '../components/ProgressCard'
import TablePreview from '../components/TablePreview'

export default function Dashboard(){
  const [projects, setProjects] = useState([])
  const [metrics, setMetrics] = useState([])
  const [rows, setRows] = useState([])
  const [role, setRole] = useState('')
  const [userLabel, setUserLabel] = useState('')
useEffect(() => {
  fetchProjects()
    .then(res => setProjects(res.data))
    .catch(() => setProjects([]));

  fetchMetrics()
    .then(res => setMetrics(res.data)) // ✅ important: use res.data
    .catch(() => setMetrics([]));

  fetchTablePreview()
    .then(res => setRows(res.data)) // also use res.data if Axios
    .catch(() => setRows([]));
}, []);

  const location = useLocation()
  useEffect(()=>{
    if(!location || !location.state) return
    const s = location.state
    if(s.userLabel) setUserLabel(s.userLabel)
  },[location])

  return (
    <div>
      <section className="projects">
      {projects.map(p => (
  <option key={p.id} value={p.name}>
    {p.name}
  </option>
))}
      </section>

      <section className="metrics area">
        <div className="metrics-grid">
          {metrics.map(m => (
  <div key={m.id} className="metric-card" style={{ borderColor: m.color }}>
    <div className="metric-label">{m.label}</div>
    <div className="metric-value">{m.value}</div>
  </div>
))}
          <ProgressCard percent={78} />
        </div>
      </section>

      <TablePreview rows={rows} />
    </div>
  )
}
