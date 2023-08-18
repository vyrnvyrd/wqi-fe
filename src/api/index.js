import { handleParam, handleQuery } from './handler'
import httpInstance from './httpInstance'
const _ = require('lodash')

const request = async config => {

  config.headers = config.headers
    ? config.headers
    : {
      'Cache-Control': 'no-store',
    }

  return httpInstance.request(_.pick(config, ['url', 'method', 'data', 'headers', 'responseType']))
}

export const get = async (url, opts = {}) => {
  const options = {
    method: 'get',
    url: `${handleParam(url, opts.params)}${handleQuery(opts.query)}`,
    headers: opts.headers,
    responseType: opts.responseType
  }
  return request(options)
}

export const post = async (url, body, opts = {}) => {
  const options = {
    method: 'post',
    url: `${handleParam(url, opts.params)}${handleQuery(opts.query)}`,
    data: body,
    headers: opts.headers
  }

  return request(options)
}

export const put = async (url, body, opts = {}) => {
  const options = {
    method: 'put',
    url: `${handleParam(url, opts.params)}${handleQuery(opts.query)}`,
    data: body,
    headers: opts.headers
  }

  return request(options)
}

export const del = async (url, body, opts = {}) => {
  const options = {
    method: 'delete',
    url: `${handleParam(url, opts.params)}${handleQuery(opts.query)}`,
    data: body,
    headers: opts.headers
  }
  return request(options)
}
