import React, { useEffect, useState } from 'react'
import { fetchTablePreview } from '../api'

export default function TablePreview({ projectId, initialPage = 1, initialPageSize = 10 }){
  const [items, setItems] = useState([])
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(!projectId) return
    setLoading(true)
    fetchTablePreview(projectId, page, pageSize).then(res => {
      setItems(res.items || [])
      setTotal(res.totalCount || 0)
    }).catch(err => {
      console.error('Failed to load table preview', err)
      setItems([])
      setTotal(0)
    }).finally(()=> setLoading(false))
  },[projectId, page, pageSize])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <section className="table-preview">
      <h2>Table Preview</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>Showing {items.length} of {total}</div>
        <div>
          <label>Page Size: </label>
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tower</th>
              <th>Unit</th>
              <th>Apartment</th>
              <th>Typology</th>
              <th>Quantity</th>
              <th>Priority</th>
              <th>Configured</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8}>Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={8}>No data</td></tr>
            ) : (
              items.map((r, idx) => (
                <tr key={`${r.tower}-${r.unit}-${idx}`}>
                  <td>{r.tower}</td>
                  <td>{r.unit}</td>
                  <td>{r.apartment}</td>
                  <td>{r.typology}</td>
                  <td>{r.quantity}</td>
                  <td>{r.priority}</td>
                  <td>{r.configured ? 'Yes' : 'No'}</td>
                  <td>{r.updated}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
        <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page<=1}>Prev</button>
        <div>Page {page} / {totalPages}</div>
        <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page>=totalPages}>Next</button>
      </div>
    </section>
  )
}
