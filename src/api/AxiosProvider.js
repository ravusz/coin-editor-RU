import axios from 'axios'

function AxiosProvider (baseUrl) {
  const instance = axios.create({
    baseURL: baseUrl
  })

  return instance
}

export default AxiosProvider
