import axios from 'axios'

const API_BASE_URL = 'http://localhost:3031'

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchTasks = () => {
  return client.get('/tasks')
}

export const createTask = task => {
  return client.post('/tasks', task)
}

export const editTask = (id, params) => {
  console.log('api-edittask', `/tasks/${id}`, params)
  return client.put(`/tasks/${id}`, params)
}
