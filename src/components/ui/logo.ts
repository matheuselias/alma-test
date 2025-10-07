'use client'

import styled, { css, DefaultTheme } from 'styled-components'
import Link from 'next/link'

export const Logo = styled(Link)`
  ${({ theme }: { theme: DefaultTheme }) => css`
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.gray};
    text-decoration: none;

    &:hover {
      color: ${theme.colors.primary};
    }
  `}
`
