import { render, screen, waitFor } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { useRouter } from 'next/navigation'
import LoginPage from '../page'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
})

describe('Login Page', () => {
  const mockPush = vi.fn()
  const mockRouter = {
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn()
  }

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue(mockRouter)
    vi.clearAllMocks()
  })

  it('renders login form with all required fields', () => {
    render(<LoginPage />)

    expect(screen.getByText('Admin Login')).toBeInTheDocument()
    expect(
      screen.getByText('Mock login. Use any email and the password "admin".')
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    const submitButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText('Email and password are required')
      ).toBeInTheDocument()
    })
  })

  it('shows validation error for invalid email format', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText('Email and password are required')
      ).toBeInTheDocument()
    })
  })

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'admin')
    await user.click(submitButton)

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'authToken',
        'mock-token'
      )
      expect(mockRouter.replace).toHaveBeenCalledWith('/leads')
    })
  })

  it('redirects to leads if already authenticated', () => {
    localStorageMock.getItem.mockReturnValue('existing-token')
    render(<LoginPage />)

    expect(mockRouter.replace).toHaveBeenCalledWith('/leads')
  })
})
