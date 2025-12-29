import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import {
  fetchProjects,
  fetchMetrics,
  fetchTablePreview,
  fetchMenusByUser,
} from "./api";
import Reports from "./pages/Reports";
import DefaultDropdown from "./pages/DefaultDropdown";
import Dashboard from "./pages/Dashboard";
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'

export default function App() {
  const [menus, setMenus] = useState({});
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('')
  // roles handled by backend; no role state in UI
  const [selectedUserCode, setSelectedUserCode] = useState('')
  const [selectedUserLabel, setSelectedUserLabel] = useState('')
  const [metrics, setMetrics] = useState([]);
  const [rows, setRows] = useState([]);
  

  useEffect(() => {
    // do not load global projects/metrics/rows here; pages fetch what they need
    // menus will be loaded per-user
  }, []);

  // role handling moved to backend; no UI role selection anymore

  // no-op placeholder for potential user-based side effects

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar menus={menus} userCode={selectedUserCode} />
        <main className="main">
          <Header project={selectedProject || projects[0]?.name || ""} selectedUser={selectedUserLabel} />

          <Routes>
            <Route path="/" element={<DefaultDropdown projects={projects} onSelectProject={(p)=>{ setSelectedProject(p); }} onSelectUser={(userCode, userLabel, menus) => { if(userCode){ if(menus) setMenus(menus); else fetchMenusByUser(userCode).then(setMenus); setSelectedUserCode(userCode); setSelectedUserLabel(userLabel) } }} />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new" element={<ComingSoon />} />
            <Route path="/view" element={<ComingSoon />} />
            <Route path="/bulk" element={<ComingSoon />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<DefaultDropdown projects={projects} onSelectProject={(p)=>{ setSelectedProject(p); }} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
