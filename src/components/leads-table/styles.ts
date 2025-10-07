'use client'

import styled, { css, DefaultTheme } from 'styled-components'

export const PageContainer = styled.div`
  ${({ theme }) => css`
    min-height: 100vh;
    background-color: ${theme.colors.lightBlue};
    padding: 2rem;
  `}
`

export const TableContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    @media (max-width: 768px) {
      overflow-x: auto;
      border-radius: 0.5rem;
    }
  `}
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;

  @media (max-width: 768px) {
    min-width: 600px;
  }
`

export const TableHeader = styled.thead`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-bottom: 0.1rem solid ${theme.colors.lightGray};
  `}
`

export const TableRow = styled.tr`
  ${({ theme }) => css`
    border-bottom: 0.1rem solid ${theme.colors.lightGray};

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: ${theme.colors.lightGray};
    }
  `}
`

export const TableHeaderCell = styled.th`
  ${({ theme }) => css`
    padding: 1rem 1.5rem;
    text-align: left;
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.gray};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: relative;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${theme.colors.lightGray};
    }

    .sort-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      align-items: center;
      color: ${theme.colors.gray};
    }

    @media (max-width: 768px) {
      padding: 0.75rem 1rem;
      font-size: 0.75rem;
    }
  `}
`

export const TableCell = styled.td`
  ${({ theme }) => css`
    padding: 1rem 1.5rem;
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.gray};
    vertical-align: middle;

    @media (max-width: 768px) {
      padding: 0.75rem 1rem;
      font-size: 0.75rem;
    }
  `}
`

export const PaginationContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    border-top: 1px solid ${theme.colors.lightGray};

    @media (max-width: 768px) {
      justify-content: center;
      padding: 1rem;
      gap: 0.25rem;
    }
  `}
`

export const PaginationButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid ${theme.colors.lightGray};
    border-radius: 0.375rem;
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray};
    font-size: ${theme.font.sizes.small};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.lightGray};
      border-color: ${theme.colors.gray};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}
`

export const PaginationNumber = styled.button<{ active: boolean }>`
  ${({ theme, active }: { theme: DefaultTheme; active: boolean }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid ${active ? theme.colors.black : theme.colors.lightGray};
    border-radius: 0.375rem;
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    font-size: ${theme.font.sizes.small};
    font-weight: ${active ? theme.font.bold : theme.font.regular};
    cursor: pointer;
    transition: all 0.2s ease;
  `}
`
