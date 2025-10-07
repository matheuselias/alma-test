'use client'
import styled, { css, DefaultTheme } from 'styled-components'

export const TextInput = styled.input`
  ${({ theme }: { theme: DefaultTheme }) => css`
    width: 100%;
    padding: 1rem 1.2rem;
    border: 1px solid ${theme.colors.lightGray};
    border-radius: 0.8rem;
    outline: none;

    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  `}
`

export const Label = styled.label`
  ${({ theme }: { theme: DefaultTheme }) => css`
    display: block;
    font-size: ${theme.font.sizes.small};
    margin-bottom: 0.6rem;
  `}
`

export const ErrorText = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.small};
    margin-bottom: ${theme.spacings.small};
  `}
`
