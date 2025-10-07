import { LeadFormData } from '@/types/lead-form'

export function transformFormDataToDb(jsonFormsData: {
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
}): LeadFormData {
  return {
    firstName: jsonFormsData.personalInfo.firstName,
    lastName: jsonFormsData.personalInfo.lastName,
    email: jsonFormsData.personalInfo.email,
    country: jsonFormsData.personalInfo.country,
    linkedin: jsonFormsData.personalInfo.linkedin,
    visaO1: jsonFormsData.visaCategories.o1,
    visaEb1a: jsonFormsData.visaCategories.eb1a,
    visaEb2niw: jsonFormsData.visaCategories.eb2niw,
    visaDontKnow: jsonFormsData.visaCategories.dontKnow,
    resume: jsonFormsData.resume,
    helpDescription: jsonFormsData.helpDescription
  }
}

export function validateFormData(data: LeadFormData): string[] {
  const errors: string[] = []

  if (!data.firstName.trim()) errors.push('First name is required')
  if (!data.lastName.trim()) errors.push('Last name is required')
  if (!data.email.trim()) errors.push('Email is required')
  if (!data.country.trim()) errors.push('Country is required')
  if (!data.linkedin.trim()) errors.push('LinkedIn URL is required')
  if (!data.helpDescription.trim()) errors.push('Help description is required')

  const hasVisaSelection =
    data.visaO1 || data.visaEb1a || data.visaEb2niw || data.visaDontKnow
  if (!hasVisaSelection) errors.push('Please select at least one visa category')

  return errors
}
