'use client'
import { JsonForms } from '@jsonforms/react'
import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers'
import { useState } from 'react'
import { withJsonFormsControlProps } from '@jsonforms/react'
import { RankedTester, rankWith, isStringControl } from '@jsonforms/core'
import { saveForm } from '@/actions/save-form'
import { transformFormDataToDb } from '@/utils/form-data-transformer'
import { useRouter } from 'next/navigation'
import {
  FormSection,
  FormContainer,
  Section,
  SectionTitle,
  SectionDescription,
  StyledJsonForms,
  ErrorContainer,
  ErrorTitle,
  ErrorList,
  ErrorItem,
  FileUploadContainer,
  FileUploadInput,
  FileUploadLabel,
  SecctionContainer
} from './styles'
import { Button } from '../ui'

import { schema, uiSchema } from './schemas'

type FormData = {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    country: string
    linkedin: string
  }
  visaCategories: {
    o1: boolean
    eb1a: boolean
    eb2niw: boolean
    dontKnow: boolean
  }
  resume: File | undefined
  helpDescription: string
}

type FormErrors = {
  personalInfo?: {
    firstName?: string
    lastName?: string
    email?: string
    country?: string
    linkedin?: string
  }
  visaCategories?: string
  resume?: string
  helpDescription?: string
  general?: string
}

type FileUploadProps = {
  handleChange: (path: string, value: File) => void
  path: string
  errors: string
  data?: { resume?: File }
}

const FileUploadControl = ({
  handleChange,
  path,
  errors,
  data
}: FileUploadProps) => {
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      handleChange(path, file)
    } else {
      setFileName('')
    }
  }

  const displayName = fileName || data?.resume?.name || 'Choose Resume/CV file'

  return (
    <FileUploadContainer>
      <FileUploadInput
        type="file"
        id="resume-upload"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        hasError={!!errors}
      />
      <FileUploadLabel htmlFor="resume-upload">{displayName}</FileUploadLabel>
    </FileUploadContainer>
  )
}

const fileUploadTester: RankedTester = rankWith(
  10,
  (uischema, schema, context) => {
    return (
      isStringControl(uischema, schema, context) &&
      uischema.options?.custom === 'file-upload'
    )
  }
)

export default function LeadForm() {
  const router = useRouter()
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      linkedin: ''
    },
    visaCategories: {
      o1: false,
      eb1a: false,
      eb2niw: false,
      dontKnow: false
    },
    resume: undefined,
    helpDescription: ''
  })

  const initialData = formData

  const validatePersonalInfo = (data: FormData): FormErrors['personalInfo'] => {
    const errors: FormErrors['personalInfo'] = {}

    if (!data.personalInfo.firstName.trim()) {
      errors.firstName = 'First name is required'
    }
    if (!data.personalInfo.lastName.trim()) {
      errors.lastName = 'Last name is required'
    }
    if (!data.personalInfo.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!data.personalInfo.country.trim()) {
      errors.country = 'Country of citizenship is required'
    }
    if (!data.personalInfo.linkedin.trim()) {
      errors.linkedin = 'LinkedIn or personal website URL is required'
    }

    return errors
  }

  const validateVisaCategories = (data: FormData): string | undefined => {
    const { visaCategories } = data
    const hasVisaSelection =
      visaCategories.o1 ||
      visaCategories.eb1a ||
      visaCategories.eb2niw ||
      visaCategories.dontKnow

    if (!hasVisaSelection) {
      return 'Please select at least one visa category'
    }
    return undefined
  }

  const validateResume = (data: FormData): string | undefined => {
    if (!data.resume) {
      return 'Please upload your Resume/CV'
    }
    return undefined
  }

  const validateHelpDescription = (data: FormData): string | undefined => {
    if (!data.helpDescription.trim()) {
      return 'Please provide information about how we can help you'
    }
    if (data.helpDescription.trim().length < 10) {
      return 'Please provide more detailed information (at least 10 characters)'
    }
    return undefined
  }

  const validateForm = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {}

    const personalInfoErrors = validatePersonalInfo(data)
    if (personalInfoErrors && Object.keys(personalInfoErrors).length > 0) {
      newErrors.personalInfo = personalInfoErrors
    }

    const visaError = validateVisaCategories(data)
    if (visaError) {
      newErrors.visaCategories = visaError
    }

    const resumeError = validateResume(data)
    if (resumeError) {
      newErrors.resume = resumeError
    }

    const helpError = validateHelpDescription(data)
    if (helpError) {
      newErrors.helpDescription = helpError
    }

    return newErrors
  }

  const handleFormSubmit = async (data: FormData) => {
    const validationErrors = validateForm(data)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const formDataForDb = transformFormDataToDb(data)

      const result = await saveForm(formDataForDb)

      if (result.success) {
        router.push('/thank-you')
      } else {
        setErrors(result.errors || {})
      }
    } catch {
      setErrors({ general: 'An unexpected error occurred. Please try again.' })
    }
  }

  const renderErrors = () => {
    if (Object.keys(errors).length === 0) {
      return
    }

    const errorMessages: string[] = []

    if (errors.personalInfo) {
      for (const error of Object.values(errors.personalInfo)) {
        if (error) errorMessages.push(error)
      }
    }

    if (errors.visaCategories) {
      errorMessages.push(errors.visaCategories)
    }

    if (errors.resume) {
      errorMessages.push(errors.resume)
    }

    if (errors.helpDescription) {
      errorMessages.push(errors.helpDescription)
    }

    if (errors.general) {
      errorMessages.push(errors.general)
    }

    if (errorMessages.length === 0) {
      return
    }

    return (
      <ErrorContainer>
        <ErrorTitle>Please fix the following errors:</ErrorTitle>
        <ErrorList>
          {errorMessages.map((error, index) => (
            <ErrorItem key={index}>{error}</ErrorItem>
          ))}
        </ErrorList>
      </ErrorContainer>
    )
  }

  const jsonFormsOnChangeHandler = ({ data }: { data: FormData }) => {
    setFormData(data)
    if (Object.keys(errors).length > 0) {
      setErrors({})
    }
  }

  return (
    <FormSection>
      <SecctionContainer>
        <Section>
          <SectionTitle>Want to understand your visa options?</SectionTitle>
          <SectionDescription>
            Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based on your goals.
          </SectionDescription>
        </Section>
      </SecctionContainer>

      <FormContainer>
        <StyledJsonForms>
          <JsonForms
            schema={schema}
            uischema={uiSchema}
            data={initialData}
            renderers={[
              ...vanillaRenderers,
              {
                tester: fileUploadTester,
                renderer: withJsonFormsControlProps(FileUploadControl)
              }
            ]}
            cells={vanillaCells}
            validationMode="NoValidation"
            onChange={jsonFormsOnChangeHandler}
          />
        </StyledJsonForms>

        {renderErrors()}

        <Button
          fullWidth={false}
          type="button"
          onClick={() => handleFormSubmit(formData)}
        >
          Submit
        </Button>
      </FormContainer>
    </FormSection>
  )
}
