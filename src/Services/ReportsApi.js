import api from './api';

/**
 * Get all Reports
 * Calls: GET /Reports
 */
export const fetchReports = ({
  projectId = null,
  page = 1,
  pageSize = 10,
  startDate = null,
  endDate = null
} = {}) => {
  return api.get("/reports", {
    params: {
      projectId,
      page,
      pageSize,
      startDate,
      endDate
    }
  });
};