export type LeadFormData = {
  firstName: string
  lastName: string
  email: string
  country: string
  linkedin: string
  visaO1: boolean
  visaEb1a: boolean
  visaEb2niw: boolean
  visaDontKnow: boolean
  resume?: File
  resumeFileName?: string
  resumeFilePath?: string
  helpDescription: string
}

export type LeadFormSubmission = LeadFormData & {
  id: string
  createdAt: Date
  updatedAt: Date
}

export type LeadFormErrors = {
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

export type LeadFormResponse = {
  success: boolean
  message: string
  data?: LeadFormSubmission
  errors?: LeadFormErrors
}
