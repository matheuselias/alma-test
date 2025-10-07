'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Nav,
  SidebarWrap,
  Logo,
  NavLink,
  Footer,
  Avatar,
  UserInfo,
  Overlay,
  CloseButton
} from './styles'
import { OutlineButton } from '@/components/ui'
import { leadsPath, settingsPath } from '@/paths'
import { X } from 'lucide-react'

type SidebarProps = {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const active = (href: string) => pathname === href

  const handleSignOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authEmail')
    router.replace('/login')
  }

  return (
    <>
      <Overlay isOpen={isOpen} onClick={onToggle} />

      <SidebarWrap isOpen={isOpen}>
        <CloseButton isOpen={isOpen} onClick={onToggle}>
          <X />
        </CloseButton>

        <Logo>almă</Logo>
        <Nav>
          <NavLink href={leadsPath()} active={active(leadsPath())}>
            Leads
          </NavLink>
          <NavLink href={settingsPath()} active={active(settingsPath())}>
            Settings
          </NavLink>
        </Nav>

        <Footer>
          <UserInfo>
            <Avatar>A</Avatar>
            <span>Admin</span>
          </UserInfo>
          <OutlineButton fullWidth={false} onClick={handleSignOut}>
            Sign out
          </OutlineButton>
        </Footer>
      </SidebarWrap>
    </>
  )
}
