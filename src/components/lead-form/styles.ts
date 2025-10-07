'use client'

import styled, { css, DefaultTheme } from 'styled-components'

export const FormSection = styled.div`
  background: white;
  padding: 4rem 2rem;
  flex: 1;
`

export const FormContainer = styled.div`
  max-width: 45rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const SecctionContainer = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 2rem;
`

export const Section = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`

export const SectionTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
`

export const SectionDescription = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 3rem;
  line-height: 1.5;
`

export const StyledJsonForms = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    margin-top: 2rem;

    .group-layout {
      border: none;
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
      align-items: flex-start;
      margin-top: 2rem;
      padding: 2rem 0;
    }

    .group-label {
      display: none;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 1.6rem 2rem;
      border: 0.2rem solid ${theme.colors.lightGray};
      border-radius: 0.8rem;
      font-size: ${theme.font.sizes.medium};
      font-family: inherit;
      transition: all 0.3s ease;
      background: ${theme.colors.white};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

      &::placeholder {
        color: ${theme.colors.gray};
        font-size: ${theme.font.sizes.medium};
      }
    }

    textarea {
      height: 14rem;
    }

    input[type='checkbox'] {
      width: 2rem;
      height: 2rem;
      border: 0.2rem solid ${theme.colors.lightGray};
      border-radius: 0.8rem;
      font-size: ${theme.font.sizes.medium};
    }

    .control {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .root_properties_helpDescription {
      gap: 0;
    }

    .control > input[type='checkbox'] {
      order: 1;
    }

    .control > label {
      order: 2;
      margin: 0;
    }

    .group-layout-item {
      width: 100%;
    }
  `}
`

export const ErrorContainer = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    background: ${theme.colors.lightRed};
    border: 0.2rem solid ${theme.colors.red};
    border-radius: 0.8rem;
    padding: 1.6rem;
    margin: 2rem 0;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
  `}
`

export const ErrorTitle = styled.h4`
  ${({ theme }: { theme: DefaultTheme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    &::before {
      content: '⚠️';
      font-size: ${theme.font.sizes.large};
    }
  `}
`

export const ErrorList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const ErrorItem = styled.li`
  ${({ theme }: { theme: DefaultTheme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.small};
    margin-bottom: ${theme.spacings.small};
    padding-left: ${theme.spacings.small};
    position: relative;
  `}

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    font-weight: bold;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const SuccessMessage = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    background: ${theme.colors.lightBlue};
    border: 2px solid ${theme.colors.green};
    border-radius: 8px;
    padding: 1.6rem;
    margin: 2rem 0;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  `}
`

export const SuccessText = styled.p`
  ${({ theme }: { theme: DefaultTheme }) => css`
    color: ${theme.colors.green};
    font-size: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    &::before {
      content: '✅';
      font-size: ${theme.font.sizes.large};
    }
  `}
`

export const FileUploadContainer = styled.div`
  position: relative;
  margin-bottom: 2.4rem;
`

export const FileUploadInput = styled.input<{ hasError: boolean }>`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 2;
`

export const FileUploadLabel = styled.label`
  ${({ theme }: { theme: DefaultTheme }) => css`
    display: block;
    width: 100%;
    padding: 1.6rem 2rem;
    border: 2px dashed ${theme.colors.lightGray};
    border-radius: 8px;
    font-size: ${theme.font.sizes.medium};
    font-family: inherit;
    transition: all 0.3s ease;
    background: ${theme.colors.white};
    cursor: pointer;
    text-align: center;
    color: ${theme.colors.gray};
    position: relative;
    z-index: 1;

    &:hover {
      border-color: ${theme.colors.purple};
      background: ${theme.colors.white};
      color: ${theme.colors.purple};
    }
  `}
`

export const ErrorMessage = styled.div`
  ${({ theme }: { theme: DefaultTheme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.small};
    margin-top: 0.8rem;
    display: block;
    font-weight: ${theme.font.bold};
  `}
`
