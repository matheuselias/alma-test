'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Page,
  Card,
  Title,
  Text,
  Label,
  Input,
  ErrorText,
  Button
} from './styles'
import { PageContainer } from '../styles'
import { Logo } from '@/components/navigation/styles'
import { Header } from '@/components/ui'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('authToken')) {
      router.replace('/leads')
    }
  }, [router])

  const handleLogin = () => {
    if (!email || !password) {
      setError('Email and password are required')
      return
    }
    if (password !== 'admin') {
      setError('Invalid credentials (hint: password is "admin")')
      return
    }
    setError('')
    localStorage.setItem('authToken', 'mock-token')
    localStorage.setItem('authEmail', email)
    router.replace('/leads')
  }

  return (
    <PageContainer>
      <Header>
        <div style={{ alignSelf: 'flex-start' }}>
          <Logo href="/">almă</Logo>
        </div>
      </Header>
      <Page>
        <Card>
          <Title>Admin Login</Title>
          <Text>
            Mock login. Use any email and the password &quot;admin&quot;.
          </Text>

          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          {error && <ErrorText>{error}</ErrorText>}

          <Button fullWidth={false} onClick={handleLogin}>
            Sign in
          </Button>
        </Card>
      </Page>
    </PageContainer>
  )
}
