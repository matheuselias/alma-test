import '@testing-library/jest-dom'
import { vi } from 'vitest'

const mockTheme = {
  font: {
    light: 300,
    normal: 400,
    bold: 600,
    sizes: {
      xsmall: '1.2rem',
      small: '1.4rem',
      medium: '1.6rem',
      large: '1.8rem',
      xlarge: '2.0rem',
      xxlarge: '2.8rem',
      huge: '5.2rem'
    }
  },
  colors: {
    primary: '#2f5b50',
    secondary: '#e0f0bc',
    mainBg: '#b0c49f',
    lightBg: '#d9e8c2',
    white: '#FAFAFA',
    black: '#030517',
    lightGray: '#EAEAEA',
    gray: '#8F8F8F',
    darkGray: '#2E2F42',
    red: '#FF6347',
    purple: '#9b59b6',
    pink: '#8e44ad',
    green: '#2d5016',
    lightGreen: '#d9e8c2'
  },
  spacings: {
    small: '0.8rem',
    medium: '1.6rem',
    large: '2.4rem'
  }
}

vi.mock('styled-components', async () => {
  const actual = await vi.importActual('styled-components')
  const React = await import('react')
  return {
    ...actual,
    ThemeProvider: ({ children }: { children: React.ReactNode }) =>
      React.createElement(actual.ThemeProvider, { theme: mockTheme }, children),
    useTheme: () => mockTheme
  }
})

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn()
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams())
}))

vi.mock('next/link', () => ({
  default: ({
    children,
    href
  }: {
    children: React.ReactNode
    href: string
  }) => {
    const React = require('react')
    return React.createElement('a', { href }, children)
  }
}))

vi.mock('@/actions/get-leads', () => ({
  getLeads: vi.fn(),
  updateLeadStatus: vi.fn()
}))

vi.mock('@/actions/save-form', () => ({
  saveForm: vi.fn()
}))

vi.mock('@/utils/form-data-transformer', () => ({
  transformFormDataToDb: vi.fn((data) => data)
}))

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
  },
  writable: true
})
