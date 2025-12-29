import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchProjects, fetchMetrics, fetchTablePreview } from '../api'
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
  const [selectedProjectId, setSelectedProjectId] = useState('')

  useEffect(()=>{
    fetchProjects().then(setProjects)
    fetchMetrics().then(setMetrics)
    // select first project by id for table preview
    fetchProjects().then(ps => {
      const id = ps?.[0]?.id
      if(id) setSelectedProjectId(id)
    }).catch(()=>{})
  },[])

  const location = useLocation()
  useEffect(()=>{
    if(!location || !location.state) return
    const s = location.state
    if(s.userLabel) setUserLabel(s.userLabel)
  },[location])

  return (
    <div>
      <section className="projects">
        {projects.map(p=> <ProjectCard key={p.id} project={p} />)}
      </section>

      <section className="metrics area">
        <div className="metrics-grid">
          {metrics.slice(0,9).map(m => <MetricCard key={m.id} item={m} />)}
          <ProgressCard percent={78} />
        </div>
      </section>

      <TablePreview projectId={selectedProjectId} />
    </div>
  )
}
