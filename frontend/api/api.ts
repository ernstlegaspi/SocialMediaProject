import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:3001/" })

// API.interceptors.request.use(req => {
// 	if(localStorage.getItem(`admin`)) {
// 		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(`admin`)!).token}`
// 	}
// 	return req
// })

