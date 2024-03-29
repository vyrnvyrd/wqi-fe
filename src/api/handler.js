const _ = require('lodash')
export const handleParam = (url, params) => {
  let compiledUrl = _.cloneDeep(url)

  if (params)
    Object.keys(params).forEach(param => {
      compiledUrl = compiledUrl.replace(`:${param}`, params[param])
    })

  return compiledUrl
}

export const handleQuery = (query = {}) => {
  if (!query) return ''
  // get array of key value pairs ([[k1, v1], [k2, v2]])
  const qs = Object.entries(query)
    // filter pairs with undefined value
    .filter(pair => pair[1] !== undefined)
    // encode keys and values, remove the value if it is null, but leave the key
    .map(pair => {
      if (pair[1].constructor === Array) {
        return pair[1]
          .map(data => {
            return `${encodeURIComponent(pair[0])}=${encodeURIComponent(data)}`
          })
          .join('&')
      } else {
        return pair
          .filter(i => i !== null)
          .map(encodeURIComponent)
          .join('=')
      }
    })
    .join('&')

  return qs && '?' + qs
}
