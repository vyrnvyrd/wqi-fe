import axios from 'axios'

const baseURLWilayah = process.env.REACT_APP_WILAYAH_URL

const httpInstanceWilayah = axios.create({ timeout: 18000, baseURLWilayah })

const handleResponse = res => {
  if (!res) return { ok: false }

  const { data, status } = res
  const ok = status && status >= 200 && status < 300

  return { ok, status, data }
}

httpInstanceWilayah.interceptors.response.use(
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

export default httpInstanceWilayah
