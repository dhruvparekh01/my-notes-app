import axios from 'axios'

// Create an axios instance and export it to be used for the entire application

const request = axios.create({
    baseURL: "http://notetakerapi-env.eba-gtdrqys2.us-east-2.elasticbeanstalk.com/"
})

// Attach an interceptor to get the value of jwt from session storage and use it as auth token
// for all requests.
try {
    request.interceptors.request.use((config) => {
        const token = sessionStorage.getItem('jwt')
        config.headers.Authorization = `Bearer ${token}`
        return config
    })
} catch {}

export default request
