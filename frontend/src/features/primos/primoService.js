import axios from 'axios'

const API_URL = '/api/primoTracker/'

// Create new tracked primo
const createPrimo = async (primoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, primoData, config)

  return response.data
}

// Get user primos
const getPrimos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user primo
const deletePrimo = async (primoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + primoId, config)

  return response.data
}

const goalService = {
  createPrimo,
  getPrimos,
  deletePrimo
}

export default goalService
