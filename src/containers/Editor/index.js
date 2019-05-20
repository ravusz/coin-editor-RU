import React from 'react'
import {
  FormGroup,
  Label,
  Textarea,
  Grid,
  Row,
  Col,
  Button
} from '@smooth-ui/core-sc'
import stringReplaceAsync from 'string-replace-async'
import memoize from 'memoizee'
import { NotificationManager } from 'react-notifications'
import { debounce } from 'lodash'

import CoinService from '../../api/services/CoinService'
import { Wrapper } from './styles'

const regexName = /{{ Name\/(.*?) }}/g
const regexPrice = /{{ Price\/(.*?) }}/g

export default class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { editedText: '', coinsList: [] }
  }

  componentDidMount() {
    CoinService.getCoinsList().then(coinsList => {
      this.setState({
        coinsList: coinsList
      })
    })
  }

  changeEditorText = debounce(text => {
    stringReplaceAsync(text, regexPrice, this.getCoinPriceInDollars)
      .then(value => {
        return value.replace(regexName, (matchedString, symbol) => {
          return this.checkIfSymbolExist(this.getCoinDetails(symbol, 'name'))
        })
      })
      .then(editedText => {
        this.setState({ editedText: editedText })
      })
  }, 500)

  getCoinPriceInDollars = memoize((matchedString, symbol) => {
    return CoinService.getCoinPriceInDollars(
      this.checkIfSymbolExist(this.getCoinDetails(symbol, 'id'))
    )
      .then(coin => {
        return `${coin.price.toFixed(2)}$`
      })
      .catch(error => {
        return ''
      })
  })

  getCoinDetails = memoize((symbol, detail) => {
    let coin = this.state.coinsList.find(coin => {
      return coin.symbol === symbol.trim()
    })
    return coin ? coin[detail] : null
  })

  checkIfSymbolExist = value => {
    if (value) {
      return value
    } else {
      NotificationManager.error('Symbol does not exist', 'Error')
      return ''
    }
  }

  render() {
    const { editedText } = this.state

    return (
      <Grid height={'95vh'}>
        <Row height={'100%'}>
          <Col>
            <Textarea
              size="lg"
              placeholder="Text"
              width={'90%'}
              height={'590px'}
              onChange={event => {
                this.changeEditorText(event.target.value)
              }}
            />
          </Col>
          <Col>
            <Wrapper> {`${editedText}`}</Wrapper>
          </Col>
        </Row>
      </Grid>
    )
  }
}
