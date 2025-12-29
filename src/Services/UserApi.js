import api from './api';


export const fetchUsers = (userCode) => {
  return api.get('/admin/users', {
    params: {
      userCode
    }
  });
};