import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL

const httpInstance = axios.create({ timeout: 18000, baseURL })

const handleResponse = res => {
  if (!res) return { ok: false }

  const { data, status } = res
  const ok = status && status >= 200 && status < 300

  return { ok, status, data }
}

httpInstance.interceptors.response.use(
  response => handleResponse(response),
  async error => {
    const { response } = error
    let responseTimeout
    if (error?.code === 'ECONNABORTED') {
      responseTimeout = {
        status: 408,
        data: {
          error: {
            message:
              'Looks like the server is taking to long to respond. Please try again in while if still no update.'
          }
        }
      }
    }

    return handleResponse(response ? response : responseTimeout)
  }
)

export default httpInstance
