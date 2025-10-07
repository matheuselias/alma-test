'use client'

import styled, { css, DefaultTheme } from 'styled-components'

export const Header = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    background: linear-gradient(
      135deg,
      ${theme.colors.lightBg} 0%,
      ${theme.colors.mainBg} 100%
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
  `}
`
