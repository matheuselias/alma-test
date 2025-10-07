'use client'

import { PageContainer, Logo, MainHeading } from './styles'
import LeadForm from '@/components/lead-form'
import Link from 'next/link'
import { Header, OutlineButton } from '@/components/ui'

export default function Home() {
  return (
    <PageContainer>
      <Header>
        <div style={{ alignSelf: 'flex-start' }}>
          <Link href="/login">
            <OutlineButton>Login</OutlineButton>
          </Link>
        </div>
        <div>
          <Logo>almă</Logo>
          <MainHeading>Get An Assessment Of Your Immigration Case</MainHeading>
        </div>
      </Header>

      <LeadForm />
    </PageContainer>
  )
}
