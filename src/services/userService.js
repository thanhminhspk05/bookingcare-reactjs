import axios from '../axios';

const handleLoginService = (email, password) => {
    return axios.post('/api/login', { email, password });
};

const getAllUsers = (userId) => {
    return axios.get(`/api/get-all-users/?id=${userId}`);
};

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
};

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user?id=${userId}`);
};

const editUserService = (data) => {
    return axios.put('/api/edit-user', data);
};

export { handleLoginService, getAllUsers, createNewUserService, deleteUserService, editUserService };
