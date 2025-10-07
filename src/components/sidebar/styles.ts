'use client'

import styled, { css, DefaultTheme } from 'styled-components'
import Link from 'next/link'

export const SidebarWrap = styled.aside<{ isOpen: boolean }>`
  ${({ theme, isOpen }: { theme: DefaultTheme; isOpen: boolean }) => css`
    width: 26rem;
    min-height: 100vh;
    background: linear-gradient(
      180deg,
      ${theme.colors.lightGreen} 0%,
      ${theme.colors.white} 30%
    );
    border-right: 1px solid ${theme.colors.lightGray};
    padding: 24px 16px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    transition: transform 0.3s ease;

    @media (max-width: 1024px) {
      transform: ${isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    }
  `}
`

export const Logo = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
    margin-bottom: 3.2rem;
  `}
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

export const NavLink = styled(Link)<{ active: boolean }>`
  ${({ theme, active }: { theme: DefaultTheme; active: boolean }) => css`
    color: ${active ? theme.colors.black : theme.colors.gray};
    font-weight: ${theme.font.bold};
    text-decoration: none;
    padding: 0.8rem 1rem;
    border-radius: 0.8rem;
  `}
`

export const Footer = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    position: absolute;
    bottom: 2rem;
    left: 1.6rem;
    right: 1.6rem;
    display: flex;
    align-items: center;
    gap: 1.2rem
    font-weight: ${theme.font.bold};
    justify-content: space-between;
  `}
`

export const Avatar = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    width: 4rem;
    height: 4rem;
    border-radius: 9999px;
    background: ${theme.colors.lightGray};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
  `}
`
export const UserInfo = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    display: flex;
    align-items: center;
    gap: 1.2rem;

    span {
      font-size: ${theme.font.sizes.medium};
      font-weight: ${theme.font.bold};
    }
  `}
`

export const Overlay = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }: { isOpen: boolean }) => css`
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: ${isOpen ? 1 : 0};
    visibility: ${isOpen ? 'visible' : 'hidden'};
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;

    @media (max-width: 1024px) {
      display: block;
    }
  `}
`

export const CloseButton = styled.button<{ isOpen: boolean }>`
  ${({ theme, isOpen }: { theme: DefaultTheme; isOpen: boolean }) => css`
    display: none;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1002;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 0.875rem;
    color: ${theme.colors.gray};
    opacity: ${isOpen ? 1 : 0};
    visibility: ${isOpen ? 'visible' : 'hidden'};
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;

    @media (max-width: 1024px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
`
