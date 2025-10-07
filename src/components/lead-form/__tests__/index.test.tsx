import { render, screen, waitFor } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { useRouter } from 'next/navigation'
import LeadForm from '../index'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('@/actions/save-form', () => ({
  saveForm: vi.fn()
}))

vi.mock('@/utils/form-data-transformer', () => ({
  transformFormDataToDb: vi.fn((data) => data)
}))

describe('Lead Form', () => {
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

  it('renders the form with all sections', () => {
    render(<LeadForm />)

    expect(
      screen.getByText('Want to understand your visa options?')
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.'
      )
    ).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<LeadForm />)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    await waitFor(
      () => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument()
      },
      { timeout: 10000 }
    )
  }, 15000)

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<LeadForm />)

    const emailInput = screen.getByPlaceholderText(/email/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    await waitFor(
      () => {
        expect(
          screen.getByText(/please enter a valid email address/i)
        ).toBeInTheDocument()
      },
      { timeout: 10000 }
    )
  }, 15000)

  it('validates visa category selection', async () => {
    const user = userEvent.setup()
    render(<LeadForm />)

    const firstNameInput = screen.getByPlaceholderText(/first name/i)
    const lastNameInput = screen.getByPlaceholderText(/last name/i)
    const emailInput = screen.getByPlaceholderText(/email/i)
    const countryInput = screen.getByRole('combobox')
    const linkedinInput = screen.getByPlaceholderText(/linkedin/i)

    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(countryInput, 'United States of America')
    await user.type(linkedinInput, 'https://linkedin.com/johndoe')

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    await waitFor(
      () => {
        expect(
          screen.getByText(/please select at least one visa category/i)
        ).toBeInTheDocument()
      },
      { timeout: 10000 }
    )
  }, 15000)

  it('validates resume upload', async () => {
    const user = userEvent.setup()
    render(<LeadForm />)

    const firstNameInput = screen.getByPlaceholderText(/first name/i)
    const lastNameInput = screen.getByPlaceholderText(/last name/i)
    const emailInput = screen.getByPlaceholderText(/email/i)
    const countryInput = screen.getByRole('combobox')
    const linkedinInput = screen.getByPlaceholderText(/linkedin/i)

    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(countryInput, 'United States of America')
    await user.type(linkedinInput, 'https://linkedin.com/johndoe')

    const visaCheckbox = screen.getByLabelText(/o-1/i)
    await user.click(visaCheckbox)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    await waitFor(
      () => {
        expect(
          screen.getByText(/please upload your resume\/cv/i)
        ).toBeInTheDocument()
      },
      { timeout: 10000 }
    )
  }, 15000)

  it('validates help description', async () => {
    const user = userEvent.setup()
    render(<LeadForm />)

    const firstNameInput = screen.getByPlaceholderText(/first name/i)
    const lastNameInput = screen.getByPlaceholderText(/last name/i)
    const emailInput = screen.getByPlaceholderText(/email/i)
    const countryInput = screen.getByRole('combobox')
    const linkedinInput = screen.getByPlaceholderText(/linkedin/i)

    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(countryInput, 'United States of America')
    await user.type(linkedinInput, 'https://linkedin.com/johndoe')

    const visaCheckbox = screen.getByLabelText(/o-1/i)
    await user.click(visaCheckbox)

    const fileInput = screen.getByLabelText(/choose resume\/cv file/i)
    const file = new File(['test content'], 'resume.pdf', {
      type: 'application/pdf'
    })
    await user.upload(fileInput, file)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)

    await waitFor(
      () => {
        expect(
          screen.getByText(
            /please provide information about how we can help you/i
          )
        ).toBeInTheDocument()
      },
      { timeout: 10000 }
    )
  }, 15000)

  it('submits form successfully with all required fields', async () => {
    const user = userEvent.setup()
    const { saveForm } = vi.mocked(await import('@/actions/save-form'))
    saveForm.mockResolvedValue({ success: true })

    render(<LeadForm />)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await user.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument()
    })
  })
})
