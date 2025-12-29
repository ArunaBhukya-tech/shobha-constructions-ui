// src/Services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7003/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


export function fetchTablePreview() {
  return Promise.resolve([
    { tower: 'A', unit: 1, apartment: 'A101', typology: '2 BHK Type B', quantity: '95 m�', priority: 'High', configured: true, updated: '08-Apr-2025' },
    { tower: 'A', unit: 2, apartment: 'A208', typology: '3 BHK Type A', quantity: '125 m�', priority: 'Medium', configured: false, updated: '08-Apr-2025' },
    { tower: 'B', unit: 1, apartment: 'B204', typology: '1 BHK Type A', quantity: '55 m�', priority: 'Low', configured: true, updated: '07-Apr-2025' }
  ]);
}

export default api;
