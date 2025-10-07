'use client'

import styled, { css } from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
`

export const Container = styled.div`
  ${({ theme }) => css`
    min-height: 100vh;
    background-color: ${theme.colors.white};
    padding: 1rem;
    width: 100%;
    margin-left: 26rem;
    transition: margin-left 0.3s ease;

    @media (max-width: 1024px) {
      margin-left: 0;
      padding: 1rem;
    }

    @media (max-width: 768px) {
      padding: 0.5rem;
    }
  `}
`

export const MobileMenuButton = styled.button<{ isOpen: boolean }>`
  ${({ isOpen }: { isOpen: boolean }) => css`
    display: none;
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1001;

    cursor: pointer;

    opacity: ${isOpen ? 0 : 1};
    visibility: ${isOpen ? 'hidden' : 'visible'};
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;

    @media (max-width: 1024px) {
      display: block;
    }
  `}
`
