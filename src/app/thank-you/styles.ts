'use client'
import styled from 'styled-components'
import {
  PageContainer as BasePageContainer,
  SubTitle,
  Title as BaseTitle,
  Button as BaseButton
} from '@/components/ui'

export const PageContainer = styled(BasePageContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`

export const ContentContainer = styled.div`
  text-align: center;
  max-width: 70rem;
  width: 100%;
`

export const IconContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`

export const DocumentIcon = styled.div`
  width: 8rem;
  height: 10rem;
  position: relative;

  .document {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%);
    border-radius: 8px;
    position: relative;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: perspective(200px) rotateX(5deg) rotateY(-5deg);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
      );
      border-radius: 8px;
    }
  }

  .dots {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .dot {
    width: 6px;
    height: 6px;
    background-color: #60a5fa;
    border-radius: 50%;
    box-shadow: 0 0 4px rgba(96, 165, 250, 0.3);
  }
`

export const Title = styled(BaseTitle)`
  margin-bottom: 1.5rem;
`

export const Message = styled(SubTitle)`
  margin-bottom: 2.5rem;
`

export const Button = styled(BaseButton)`
  padding: 0.875rem 2rem;
`
