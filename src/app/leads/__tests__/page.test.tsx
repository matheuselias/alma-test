import { render, screen, waitFor } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { useRouter } from 'next/navigation'
import LeadsPage from '../page'

vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}))

vi.mock('@/actions/get-leads', () => ({
  getLeads: vi.fn(),
  updateLeadStatus: vi.fn()
}))

vi.mock('@/components/sidebar', () => ({
  default: function MockSidebar() {
    return <div data-testid="sidebar">Sidebar Component</div>
  }
}))

vi.mock('@/components/header-section', () => ({
  default: function MockHeaderSection({ onSearch, onStatusChange }: any) {
    const handleSearch = (value: string) => {
      onSearch(value)
    }

    const handleStatusChange = (value: string) => {
      onStatusChange(value)
    }

    return (
      <div data-testid="header-section">
        <input
          data-testid="search-input"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
        />
        <select
          data-testid="status-filter"
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="PENDING">PENDING</option>
          <option value="REACHED_OUT">REACHED_OUT</option>
        </select>
      </div>
    )
  }
}))

vi.mock('@/components/leads-table', () => ({
  default: function MockLeadsTable({ leads, onSort, onPageChange }: any) {
    const handleSort = (field: string) => {
      onSort(field)
    }

    const handlePageChange = (page: number) => {
      onPageChange(page)
    }

    return (
      <div data-testid="leads-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('firstName')}>Name</th>
              <th onClick={() => handleSort('email')}>Email</th>
              <th onClick={() => handleSort('createdAt')}>Submitted</th>
              <th onClick={() => handleSort('status')}>Status</th>
              <th onClick={() => handleSort('country')}>Country</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead: any) => (
              <tr key={lead.id}>
                <td>
                  {lead.firstName} {lead.lastName}
                </td>
                <td>{lead.email}</td>
                <td>{lead.createdAt}</td>
                <td>{lead.status}</td>
                <td>{lead.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => handlePageChange(2)}>Next Page</button>
      </div>
    )
  }
}))

describe('Leads Page', () => {
  const mockPush = vi.fn()
  const mockRouter = {
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn()
  }

  const mockLeads = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      country: 'USA',
      status: 'PENDING',
      createdAt: '2024-01-01',
      visaO1: true,
      visaEb1a: false,
      visaEb2niw: false,
      visaDontKnow: false,
      helpDescription: 'Test description'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      country: 'Canada',
      status: 'REACHED_OUT',
      createdAt: '2024-01-02',
      visaO1: false,
      visaEb1a: true,
      visaEb2niw: false,
      visaDontKnow: false,
      helpDescription: 'Test description 2'
    }
  ]

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue(mockRouter)
    vi.clearAllMocks()

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue('mock-token'),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
      },
      writable: true
    })
  })

  it('renders leads page with sidebar and header', async () => {
    const { getLeads } = vi.mocked(await import('@/actions/get-leads'))
    getLeads.mockResolvedValue({ leads: mockLeads, totalCount: 2 })

    render(<LeadsPage />)

    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('header-section')).toBeInTheDocument()
    expect(screen.getByTestId('leads-table')).toBeInTheDocument()
  })

  it('redirects to login when not authenticated', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue(null)
      },
      writable: true
    })

    render(<LeadsPage />)

    expect(mockRouter.replace).toHaveBeenCalledWith('/login')
  })

  it('allows searching leads', async () => {
    const user = userEvent.setup()
    const { getLeads } = vi.mocked(await import('@/actions/get-leads'))
    getLeads.mockResolvedValue({ leads: mockLeads, totalCount: 2 })

    render(<LeadsPage />)

    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'John')

    expect(searchInput).toHaveValue('John')
    expect(getLeads).toHaveBeenCalled()
  })

  it('allows filtering by status', async () => {
    const user = userEvent.setup()
    const { getLeads } = vi.mocked(await import('@/actions/get-leads'))
    getLeads.mockResolvedValue({ leads: mockLeads, totalCount: 2 })

    render(<LeadsPage />)

    const statusFilter = screen.getByTestId('status-filter')
    await user.selectOptions(statusFilter, 'PENDING')

    expect(statusFilter).toHaveValue('PENDING')
    expect(getLeads).toHaveBeenCalled()
  })

  it('allows sorting by different fields', async () => {
    const user = userEvent.setup()
    const { getLeads } = vi.mocked(await import('@/actions/get-leads'))
    getLeads.mockResolvedValue({ leads: mockLeads, totalCount: 2 })

    render(<LeadsPage />)

    const nameHeader = screen.getByText('Name')
    await user.click(nameHeader)

    expect(nameHeader).toBeInTheDocument()
    expect(getLeads).toHaveBeenCalled()
  })

  it('handles pagination', async () => {
    const user = userEvent.setup()
    const { getLeads } = vi.mocked(await import('@/actions/get-leads'))
    getLeads.mockResolvedValue({ leads: mockLeads, totalCount: 2 })

    render(<LeadsPage />)

    const nextPageButton = screen.getByText('Next Page')
    await user.click(nextPageButton)

    expect(nextPageButton).toBeInTheDocument()
    expect(getLeads).toHaveBeenCalled()
  })
})
