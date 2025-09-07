import axios from 'axios'
import { defaultApiRoute } from '../constance'

const defaultAxios = axios.create({ baseURL: defaultApiRoute })

defaultAxios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('bricks:auth')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default defaultAxios
