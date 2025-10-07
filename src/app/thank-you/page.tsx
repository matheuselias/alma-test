'use client'

import Link from 'next/link'
import {
  PageContainer,
  ContentContainer,
  IconContainer,
  DocumentIcon,
  Title,
  Message,
  Button
} from './styles'
import { homePath } from '@/paths'

export default function ThankYouPage() {
  return (
    <PageContainer>
      <ContentContainer>
        <IconContainer>
          <DocumentIcon>
            <div className="document">
              <div className="dots">
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          </DocumentIcon>
        </IconContainer>

        <Title>Thank You</Title>

        <Message>
          Your information was submitted to our team of immigration attorneys.
          Expect an email from hello@tryalma.ai.
        </Message>

        <Link href={homePath()}>
          <Button>Go Back to Homepage</Button>
        </Link>
      </ContentContainer>
    </PageContainer>
  )
}
