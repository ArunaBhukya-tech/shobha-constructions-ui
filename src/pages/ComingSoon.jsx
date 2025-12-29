import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ComingSoon(){
  const location = useLocation()
  const menuLabel = location.state?.menuLabel || ''

  return (
    <div style={{padding:24}}>
      <h2>{menuLabel ? `${menuLabel} — Coming soon` : 'Coming soon'}</h2>
      <p>This feature is not implemented yet. We are working on it.</p>
    </div>
  )
}
