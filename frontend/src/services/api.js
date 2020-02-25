import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://dropbox-backend-fabossi.herokuapp.com'
    baseURL: 'http://localhost:3000'
});

export default api;