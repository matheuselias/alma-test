'use client'

import styled from 'styled-components'
import { Center } from '@/components/ui'
import { Card as BaseCard, CardTitle, CardText } from '@/components/ui'
import { TextInput, Label, ErrorText } from '@/components/ui'
import { Button as BaseButton } from '@/components/ui'

export const Page = styled(Center)``

export const Card = styled(BaseCard)`
  width: 36rem;
`

export const Title = styled(CardTitle)``

export const Text = styled(CardText)``

export const Input = styled(TextInput)`
  margin-bottom: 1.2rem;
`

export { Label, ErrorText }

export const Button = styled(BaseButton)`
  width: 100%;
`
