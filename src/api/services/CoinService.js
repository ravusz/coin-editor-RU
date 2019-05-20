import CoreApi from '../CoreApi'

const baseQuoteCurrencyId = 'usd-us-dollars'

class CoinService extends CoreApi {
  constructor (endpoint) {
    super()

    if (endpoint) {
      this.endpoint = endpoint
      this.setEndpointUrl(this.endpoint)
    }
  }

  setEndpointUrl (url) {
    this.api.defaults.baseURL = this.baseUrl + url
  }

  getCoinsList () {
    return this.api.get('coins')
  }

  getCoinPriceInDollars (symbol) {
    return this.api.get('price-converter', {
      params: {
        base_currency_id: symbol,
        quote_currency_id: baseQuoteCurrencyId,
        amount: 1
      }
    })
  }
}

export default new CoinService('/v1/')
