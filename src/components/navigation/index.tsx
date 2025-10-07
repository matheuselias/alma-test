'use client'

import { usePathname } from 'next/navigation'
import { NavContainer, NavContent, Logo, NavLinks, NavLink } from './styles'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <NavContainer>
      <NavContent>
        <Logo href="/">almă</Logo>
        <NavLinks>
          <NavLink href="/" active={pathname === '/'}>
            Home
          </NavLink>
          <NavLink href="/leads" active={pathname === '/leads'}>
            Leads
          </NavLink>
        </NavLinks>
      </NavContent>
    </NavContainer>
  )
}
