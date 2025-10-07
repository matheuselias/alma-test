import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import HomePage from '../page'

vi.mock('@/components/lead-form', () => ({
  default: function MockLeadForm() {
    return <div data-testid="lead-form">Lead Form Component</div>
  }
}))

describe('Home Page', () => {
  it('renders the main heading and logo', () => {
    render(<HomePage />)

    expect(screen.getByText('almă')).toBeInTheDocument()
    expect(
      screen.getByText('Get An Assessment Of Your Immigration Case')
    ).toBeInTheDocument()
  })

  it('renders the login button', () => {
    render(<HomePage />)

    const loginButton = screen.getByRole('link', { name: /login/i })
    expect(loginButton).toBeInTheDocument()
    expect(loginButton).toHaveAttribute('href', '/login')
  })

  it('renders the lead form component', () => {
    render(<HomePage />)

    expect(screen.getByTestId('lead-form')).toBeInTheDocument()
  })

  it('login button is clickable', async () => {
    const user = userEvent.setup()
    render(<HomePage />)

    const loginButton = screen.getByRole('link', { name: /login/i })
    await user.click(loginButton)

    expect(loginButton).toHaveAttribute('href', '/login')
  })
})
