'use client'

import styled, { css, DefaultTheme } from 'styled-components'

export const Card = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    padding: 2.4rem;
    border: 0.1rem solid ${theme.colors.lightGray};
    border-radius: 1.2rem;
    background: ${theme.colors.white};
  `}
`

export const CardTitle = styled.h1`
  ${({ theme }: { theme: DefaultTheme }) => css`
    margin: 0 0 1.6rem 0;
    font-size: ${theme.font.sizes.large};
  `}
`

export const CardText = styled.p`
  ${({ theme }: { theme: DefaultTheme }) => css`
    color: ${theme.colors.gray};
    margin: 0 0 1.6rem 0;
  `}
`
