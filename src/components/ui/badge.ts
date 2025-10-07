'use client'

import styled, { css, DefaultTheme } from 'styled-components'
type BadgeProps = { color: string }

export const Badge = styled.span<BadgeProps>`
  ${({
    theme,
    color
  }: BadgeProps & { theme: DefaultTheme; color: string }) => css`
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.bold};
    background-color: ${color}20;
    color: ${color};
    border: 1px solid ${color}40;

    @media (max-width: 768px) {
      padding: 0.5rem 0.7rem;
      font-size: ${theme.font.sizes.xsmall};
    }
  `}
`
