import axios from 'axios'
import config from '../config'
import jwt from 'jsonwebtoken'

const api = axios.create({
  baseURL: config.EndpointRestAPI,
  timeout: 1000,
  headers: { Authorization: `bearer ${localStorage.getItem('fake-detik-authorization')}` },
})

const verifyJwtExpiration = async () => {
  const token = localStorage.getItem('fake-detik-authorization')
  const decoded = jwt.decode(token)
  if (decoded && decoded.exp < Date.now() / 1000) {
    try {
      const resp = await refreshToken()
      localStorage.setItem('fake-detik-authorization', resp.data.data.access_token)
      localStorage.setItem('fake-detik-retoken', resp.data.data.refresh_token)
      Object.assign(api.defaults, {
        headers: { Authorization: `bearer ${localStorage.getItem('fake-detik-authorization')}` },
      })
    } catch (error) {
      console.log('error refreshing token:', error)
      localStorage.removeItem('fake-detik-authorization')
      localStorage.removeItem('fake-detik-retoken')
      window.location = '/'
    }
  }
}

const refreshToken = () => {
  const refreshToken = localStorage.getItem('fake-detik-retoken')
  return api.post('/auth/refreshToken', { refresh_token: refreshToken })
}

// global rest api - get
export const apiGet = async (endpoint, page = 1, limit = 10) => {
  await verifyJwtExpiration()
  return api.get(`/${endpoint}?page=${page}&limit=${limit}`)
}

// global rest api - create
export const apiCreate = async (endpoint, payload) => {
  await verifyJwtExpiration()
  return api.post(endpoint, payload)
}

// global rest api - patch
export const apiPatch = async (endpoint, id, payload) => {
  await verifyJwtExpiration()
  return api.patch(`/${endpoint}/${id}`, payload)
}

// global rest api - delete
export const apiDestroy = async (endpoint, id) => {
  await verifyJwtExpiration()
  return api.delete(`/${endpoint}/${id}`)
}

export const getUsers = async (page = 1, limit = 10) => {
  await verifyJwtExpiration()
  return api.get(`/users?page=${page}&limit=${limit}`)
}

export const patchUser = async (id, payload = {}) => {
  await verifyJwtExpiration()
  return api.patch(`/users/${id}`, { ...payload })
}

export const destoryUser = async (id) => {
  await verifyJwtExpiration()
  return api.delete(`/users/${id}`)
}

//News endpoint
export const getNews = async (page = 1, limit = 10) => {
  await verifyJwtExpiration()
  return api.get(`/news?page=${page}&limit=${limit}`)
}

export const createNews = async (payload = {}) => {
  await verifyJwtExpiration()
  return api.post('/news', { ...payload })
}

export const patchNews = async (id, payload = {}) => {
  await verifyJwtExpiration()
  return api.patch(`/news/${id}`, { ...payload })
}

export const destroyNews = async id => {
  await verifyJwtExpiration()
  return api.delete(`/news/${id}`)
}
