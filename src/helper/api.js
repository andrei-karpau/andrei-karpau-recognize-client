import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;
const EDEN_URL = process.env.REACT_APP_EDEN_URL;
const EDEN_KEY = process.env.REACT_APP_EDEN_ACCESS_KEY;

export const login = (email, password) => axios.post(`${API_URL}/user/login`, { email, password });

export const signup = (username, email, password) => axios.post(`${API_URL}/user/signup`, {username, email, password});

export const edenRequest = (data) => axios.post(EDEN_URL, data, { headers: {Authorization: `Bearer ${EDEN_KEY}`}});

export const createNewTask = (opts) => axios.post(`${API_URL}/queries/new`,opts);
