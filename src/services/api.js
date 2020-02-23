import axios from 'axios';

const api = axios.create({
	baseURL: "https://dropbox-backend-fabossi.herokuapp.com",
});

export default api;
