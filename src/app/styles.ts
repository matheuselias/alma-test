'use client'

import styled, { css, DefaultTheme } from 'styled-components'

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const Logo = styled.h1`
  ${({ theme }: { theme: DefaultTheme }) => css`
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.green};
    margin-bottom: 1rem;
    align-self: center;

    @media (max-width: 768px) {
      font-size: ${theme.font.sizes.medium};
    }
  `}
`

export const MainHeading = styled.h2`
  ${({ theme }: { theme: DefaultTheme }) => css`
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.green};
    text-align: center;
    margin: 0;
    line-height: 1.2;
    position: relative;
    z-index: 1;
    align-self: center;

    @media (max-width: 768px) {
      font-size: ${theme.font.sizes.medium};
    }

    @media (max-width: 480px) {
      font-size: ${theme.font.sizes.small};
    }
  `}
`
