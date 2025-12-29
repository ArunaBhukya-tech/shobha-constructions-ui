import React, { useEffect, useState, useRef } from 'react';
import { fetchProjects, fetchMetrics } from '../api'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const COLORS = ['#FFB347','#6366F1','#34D399']

export default function Reports(){
  const [projects, setProjects] = useState([])
  const [metrics, setMetrics] = useState([])
  const containerRef = useRef(null)

  useEffect(()=>{
    fetchProjects().then(setProjects)
    fetchMetrics().then(setMetrics)
  },[])

  // sample derived data for charts
  const donutData = [
    { name: 'Modified', value: 20 },
    { name: 'Config', value: 30 },
    { name: 'Pending', value: 10 }
  ]

  const barDataProjects = projects.map((p, idx)=>({ name: p.name, value: (idx+1)*100 }))
  const activitiesData = [
    { name: 'Gypsum Celling', value: 350 },
    { name: 'Final Coat Paint', value: 240 },
    { name: 'External painting', value: 200 },
    { name: 'Floor Tiling', value: 160 },
    { name: 'Floor Tiling', value: 120 }
  ]

  async function downloadPNG(){
    if(!containerRef.current) return
    const canvas = await html2canvas(containerRef.current, {scale:2})
    const data = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = data
    link.download = 'report.png'
    link.click()
  }

  async function downloadPDF(){
    if(!containerRef.current) return
    const canvas = await html2canvas(containerRef.current, {scale:2})
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('landscape', 'pt', 'a4')
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('report.pdf')
  }

  return (
    <div className="reports-page" ref={containerRef}>
      <div className="filters">
        <select>
          <option>The Crest</option>
          <option>Crest Grande</option>
          <option>Waves Opulence</option>
        </select>
        <input type="date" />
        <select>
          <option>Any -</option>
        </select>
        <select>
          <option>Any -</option>
        </select>
        <select>
          <option>All</option>
        </select>
        <button className="btn-primary" onClick={downloadPNG}>Download PNG</button>
        <button className="btn-primary" onClick={downloadPDF}>Download PDF</button>
      </div>

      <div className="charts">
        <div className="chart card">
          <h3>% Typologies Configured</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={donutData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} fill="#8884d8">
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart card">
          <h3>Configured Typologies per Project</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barDataProjects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart card">
          <h3>Quantity Configured per Activity</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={activitiesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="activity-table card">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>Activity</th>
              <th>Typology</th>
              <th>Action</th>
              <th>Quantity</th>
              <th>Priority</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>08.04.2025</td>
              <td>The Crest</td>
              <td>External Painting - Primer</td>
              <td>1 BHK Type A</td>
              <td>Added</td>
              <td>50</td>
              <td>70</td>
              <td>Mohan K.</td>
            </tr>
            <tr>
              <td>08.04.2025</td>
              <td>The Crest</td>
              <td>Shadow Angle Fixing - Dry</td>
              <td>2 BHK Type A</td>
              <td>Modified</td>
              <td>60</td>
              <td>70</td>
              <td>Rajesh N.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
