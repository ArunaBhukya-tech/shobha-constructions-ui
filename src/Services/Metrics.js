import api from './api';

/**
 * Get all GetMetrics
 * Calls: GET /GetMetrics
 */
export const fetchMetrics = () => {
  return api.get('/Metrics');
};