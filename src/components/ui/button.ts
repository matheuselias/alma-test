'use client'

import styled, { css, DefaultTheme } from 'styled-components'

type ButtonStyleProps = { fullWidth: boolean }

export const Button = styled.button.attrs<ButtonStyleProps>(
  (props: ButtonStyleProps) => ({
    fullWidth: props.fullWidth ?? false
  })
)<ButtonStyleProps>`
  ${({ theme, fullWidth }: { theme: DefaultTheme; fullWidth: boolean }) => css`
    padding: 1rem 1.4rem;
    border-radius: 0.8rem;
    border: none;
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    cursor: pointer;
    width: ${fullWidth ? '100%' : 'auto'};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};

    &:hover {
      background: ${theme.colors.black};
    }

    @media (max-width: 768px) {
      font-size: ${theme.font.sizes.xxsmall};
      padding: 0.5rem 0.7rem;
    }
  `}
`

export const OutlineButton = styled(Button)`
  ${({ theme }: { theme: DefaultTheme }) => css`
    background: transparent;
    color: ${theme.colors.black};
    border: 0.2rem solid ${theme.colors.black};

    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }
  `}
`
