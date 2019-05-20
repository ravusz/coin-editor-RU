import React from 'react'
import { ThemeProvider, theme } from '@smooth-ui/core-sc'
import Editor from './containers/Editor'
import { Container } from './styles'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer } from 'react-notifications'

function App () {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Editor />
        <NotificationContainer />
      </Container>
    </ThemeProvider>
  )
}

export default App
