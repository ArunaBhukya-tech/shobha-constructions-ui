import api from './api';

export const fetchMenusByUser = async (userCode) => {
  const response = await api.get('/admin/menus', {
    params: { userCode }
  });

  return response.data; 
};


export const validateMenuForUser = (userCode, menuId) => {
  return api.get('/admin/menus/validate', {
    params: {
      userCode
    }
  });
};


