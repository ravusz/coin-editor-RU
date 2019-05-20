import AxiosProvider from './AxiosProvider'
import config from '../config'

class CoreApi {
  constructor (baseUrl = config.apiBaseUrl) {
    this.api = AxiosProvider(baseUrl)
    this.baseUrl = baseUrl

    this._afterResponse = this._afterResponse.bind(this)
    this.setInterceptors(this._beforeRequest, this._requestError, this._afterResponse, this._responseError)
  }

  setInterceptors (beforeRequest, requestError, afterResponse, responseError) {
    this.api.interceptors.request.use(beforeRequest, requestError)
    this.api.interceptors.response.use(afterResponse, responseError)
  }

  setEndpointUrl (url) {
    this.api.defaults.baseURL = this.baseUrl + '/' + url
  }

  _beforeRequest (config) {
    return config
  }

  _requestError (error) {
    throw error
  }

  _afterResponse (resp) {
    return resp.data || resp
  }

  _responseError (error) {
    throw error
  }
}

export default CoreApi
