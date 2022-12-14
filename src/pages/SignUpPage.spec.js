import SignUpPage from './SignUpPage.vue'
import {render, screen} from '@testing-library/vue'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
// import axios from 'axios'
import 'whatwg-fetch'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

describe('Sign up page', () => {
  describe('Layout', () => {
    test ('has Sign Up header', () => {
      // Test code
      render (SignUpPage)
      const header = screen.queryByRole('heading', {name: 'Sign Up'})
      expect(header).toBeInTheDocument()
    })

    test ('has username input', () => {
      render (SignUpPage)
      const input = screen.queryByLabelText('Username')
      expect(input).toBeInTheDocument()
    })

    test ('has email input', () => {
      render (SignUpPage)
      const input = screen.queryByLabelText('E-mail')
      expect(input).toBeInTheDocument()
    })

    test ('has password input', () => {
      render (SignUpPage)
      const input = screen.queryByLabelText('Password')
      expect(input).toBeInTheDocument()
    })

    test ('has password type for password input', () => {
      render (SignUpPage)
      const input = screen.queryByLabelText('Password')
      expect(input.type).toBe('password')
    })

    test ('has password repeat input', () => {
      render (SignUpPage)
      const input = screen.queryByLabelText('Password repeat')
      expect(input).toBeInTheDocument()
    })

    test ('has password type for password repeat input', () => {
      render (SignUpPage)
      const input = screen.queryByLabelText('Password repeat')
      expect(input.type).toBe('password')
    })

    test ('has Sign Up button', () => {
      // Test code
      render (SignUpPage)
      const button = screen.queryByRole('button', {name: 'Sign Up'})
      expect(button).toBeInTheDocument()
    })

    test ('disabled button initially', () => {
      // Test code
      render (SignUpPage)
      const button = screen.queryByRole('button', {name: 'Sign Up'})
      expect(button).toBeDisabled()
    })
  })
  describe('Interactions', () => {
    const setup = async () => {
      render(SignUpPage)
      const usernameInput = screen.queryByLabelText('Username')
      const emailInput = screen.queryByLabelText('E-mail')
      const passwordInput = screen.queryByLabelText('Password')
      const passwordRepeatInput = screen.queryByLabelText('Password repeat')

      await userEvent.type(usernameInput, 'user1')
      await userEvent.type(emailInput, 'user1@email.com')
      await userEvent.type(passwordInput, 'P4ssword')
      await userEvent.type(passwordRepeatInput, 'P4ssword')
    }

    test ('enables button if passwords matches', async () => {
      render (SignUpPage)
      const passwordInput = screen.queryByLabelText('Password')
      const passwordRepeatInput = screen.queryByLabelText('Password repeat')

      await userEvent.type(passwordInput, 'P4ssword')
      await userEvent.type(passwordRepeatInput, 'P4ssword')

      const button = screen.queryByRole('button', {name: 'Sign Up'})
      expect(button).toBeEnabled()
    })
    test ('sends username, email and password to backend after clicking the button', 
    async () => {
      let requestBody      
      const server = setupServer(        
        rest.post('/api/1.0/users', (req, res, ctx) => {
          requestBody = req.body
          return res(ctx.status(200))
        })
      )

      server.listen()

      render (SignUpPage)
      const usernameInput = screen.queryByLabelText('Username')
      const emailInput = screen.queryByLabelText('E-mail')
      const passwordInput = screen.queryByLabelText('Password')
      const passwordRepeatInput = screen.queryByLabelText('Password repeat')

      await userEvent.type(usernameInput, 'user1')
      await userEvent.type(emailInput, 'user1@email.com')
      await userEvent.type(passwordInput, 'P4ssword')
      await userEvent.type(passwordRepeatInput, 'P4ssword')

      const button = screen.queryByRole('button', {name: 'Sign Up'})
      await userEvent.click(button)
      await server.close()

      // const mockFn = jest.fn()
      // axios.post = mockFn
      // window.fetch = mockFn      

      // const firstCall = mockFn.mock.calls[0]
      // const body = JSON.parse(firstCall[1].body)

      expect(requestBody).toEqual({
        username: 'user1',
        email: 'user1@email.com',
        password: 'P4ssword'
      })
    })

    test('does not allow clicking to the button when there is an ongoing api call', 
    async () => {
      let counter = 0
      const server = setupServer(
        rest.post('/api/1.0/users', (req, res, ctx) => {
          counter++
          return res(ctx.status(200))
        })
      )
      server.listen()
      await setup()
      const button = screen.queryByRole('button', {name: 'Sign Up'})
      await userEvent.click(button)
      await userEvent.click(button)

      await server.close()
      expect(counter).toBe(1)
    })

    test('display spinner while the api request is in progress',
    async () => {
      const server = setupServer(
        rest.post('/api/1.0/users', (req, res, ctx) => {
          return res(ctx.status(200))
        })
      )
      server.listen()
      await setup()
      const button = screen.queryByRole('button', {name: 'Sign Up'})

      await userEvent.click(button)

      const spinner = screen.queryByRole('status')
      expect(spinner).toBeInTheDocument
    })

    test('do not display spinner if there is no api request', 
    async () => {
      await setup()
      const spinner = screen.queryByRole('status')
      expect(spinner).not.toBeInTheDocument()
    })
  })
})
