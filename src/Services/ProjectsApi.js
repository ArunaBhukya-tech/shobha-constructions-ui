import api from './api';

/**
 * Get all projects
 * Calls: GET /projects
 */
export const fetchProjects = () => {
  return api.get('/projects');
};