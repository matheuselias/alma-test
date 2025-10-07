'use client'

import styled, { css, DefaultTheme } from 'styled-components'

export const HeaderSection = styled.div`
  margin-bottom: 2rem;
`

export const Title = styled.h1`
  ${({ theme }: { theme: DefaultTheme }) => css`
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.black};
    margin-bottom: 2rem;
  `}
`

export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`

export const SearchInput = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 30rem;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 0.1rem solid ${theme.colors.lightGray};
      border-radius: 0.5rem;
      font-size: ${theme.font.sizes.small};
      background-color: ${theme.colors.white};
      transition: border-color 0.2s ease;

      &:focus {
        outline: none;
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      &::placeholder {
        color: ${theme.colors.gray};
      }

      @media (max-width: 1024px) {
        width: 25rem;
      }

      @media (max-width: 768px) {
        width: 100%;
        padding: 0.875rem 1rem 0.875rem 2.5rem;
      }
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1rem;
      height: 1rem;
      color: ${theme.colors.gray};
      pointer-events: none;
    }
  `}
`

export const FilterSelect = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    position: relative;
    display: flex;
    align-items: center;

    select {
      width: 15rem;
      padding: 0.75rem 2.5rem 0.75rem 1rem;
      border: 0.1rem solid ${theme.colors.lightGray};
      border-radius: 0.5rem;
      font-size: ${theme.font.sizes.small};
      background-color: ${theme.colors.white};
      appearance: none;
      cursor: pointer;
      transition: border-color 0.2s ease;

      &:focus {
        outline: none;
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      @media (max-width: 1024px) {
        width: 12rem;
      }

      @media (max-width: 768px) {
        width: 100%;
        padding: 0.875rem 2.5rem 0.875rem 1rem;
      }
    }

    .select-icon {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1rem;
      height: 1rem;
      color: ${theme.colors.gray};
      pointer-events: none;
    }
  `}
`
