'use client'
import styled, { css } from 'styled-components'

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: 2.5rem;
    font-weight: 700;
    color: ${theme.colors.black};
  `}
`

export const SubTitle = styled.h1`
  ${({ theme }) => css`
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.black};
  `}
`

export const Paragraph = styled.p`
  ${({ theme }) => css`
    font-size: 1.125rem;
    color: ${theme.colors.gray};
    line-height: 1.6;
  `}
`
