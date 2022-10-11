import SignUpPage from './SignUpPage.vue'
import {render, screen} from '@testing-library/vue'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

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
    test ('enables button if passwords matches', async () => {
      render (SignUpPage)
      const passwordInput = screen.queryByLabelText('Password')
      const passwordRepeatInput = screen.queryByLabelText('Password repeat')

      await userEvent.type(passwordInput, 'P4ssword')
      await userEvent.type(passwordRepeatInput, 'P4ssword')

      const button = screen.queryByRole('button', {name: 'Sign Up'})
      expect(button).toBeEnabled()
    })
    test ('sends username, email and password to backend after clicking the button', async () => {
      render (SignUpPage)
      const passwordInput = screen.queryByLabelText('Password')
      const passwordRepeatInput = screen.queryByLabelText('Password repeat')

      await userEvent.type(passwordInput, 'P4ssword')
      await userEvent.type(passwordRepeatInput, 'P4ssword')

      const button = screen.queryByRole('button', {name: 'Sign Up'})
      expect(button).toBeEnabled()
    })
  })
})
