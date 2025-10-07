'use server'

import { prisma } from '@/lib/prisma'
import { LeadFormData, LeadFormResponse } from '@/types/lead-form'
import saveResume from './save-resume'

export async function saveForm(
  formData: LeadFormData
): Promise<LeadFormResponse> {
  try {
    let resumeFileName: string | undefined
    let resumeFilePath: string | undefined

    if (formData.resume) {
      try {
        const fileName = `resume_${Date.now()}_${formData.resume.name}`
        const fileBuffer = await formData.resume.arrayBuffer()

        await saveResume(fileName, Buffer.from(fileBuffer))

        resumeFileName = formData.resume.name
        resumeFilePath = `/public/${fileName}`
      } catch (fileError) {
        console.error('Error saving resume:', fileError)
        return {
          success: false,
          message: 'Failed to save resume file. Please try again.',
          errors: {
            resume: 'Failed to upload resume file. Please try again.'
          }
        }
      }
    }

    const leadForm = await prisma.leadForm.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        linkedin: formData.linkedin,
        visaO1: formData.visaO1,
        visaEb1a: formData.visaEb1a,
        visaEb2niw: formData.visaEb2niw,
        visaDontKnow: formData.visaDontKnow,
        resumeFileName,
        resumeFilePath,
        helpDescription: formData.helpDescription
      }
    })

    return {
      success: true,
      message:
        'Form submitted successfully! We will review your information and get back to you soon.',
      data: leadForm
    }
  } catch (error) {
    console.error('Error saving form:', error)

    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return {
        success: false,
        message: 'A form with this email already exists.',
        errors: {
          general: 'This email address has already been used for a submission.'
        }
      }
    }

    return {
      success: false,
      message: 'Failed to save form. Please try again.',
      errors: {
        general:
          'An error occurred while saving your information. Please try again.'
      }
    }
  }
}
