'use client'

import styled, { css, DefaultTheme } from 'styled-components'
import Link from 'next/link'

export const NavContainer = styled.nav`
  ${({ theme }: { theme: DefaultTheme }) => css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: ${theme.colors.white};
    border-bottom: 1px solid ${theme.colors.lightGray};
    z-index: 1000;
    padding: 1rem 2rem;
  `}
`

export const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

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

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`

export const NavLink = styled(Link)<{ active: boolean }>`
  ${({ theme, active }: { theme: DefaultTheme; active: boolean }) => css`
    color: ${active ? theme.colors.primary : theme.colors.gray};
    text-decoration: none;
    font-weight: ${active ? theme.font.bold : theme.font.regular};
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;

    &:hover {
      color: ${theme.colors.primary};
      background-color: ${theme.colors.lightGray};
    }
  `}
`
