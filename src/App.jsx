import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from "./components/Sidebar";

export default function App() {

    const [menus, setMenus] = useState({});
 
  return (
   <BrowserRouter>
      <div className="app">
<Sidebar menus={menus} />
      </div>
    </BrowserRouter>
  );
}
