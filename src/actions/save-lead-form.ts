'use server'

import { prisma } from '@/lib/prisma'
import { LeadFormData, LeadFormResponse } from '@/types/lead-form'

export async function saveLeadForm(
  formData: LeadFormData
): Promise<LeadFormResponse> {
  try {
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
        resumeFileName: formData.resumeFileName,
        resumeFilePath: formData.resumeFilePath,
        helpDescription: formData.helpDescription
      }
    })

    return {
      success: true,
      message: 'Lead form submitted successfully!',
      data: leadForm
    }
  } catch (error) {
    console.error('Error saving lead form:', error)
    return {
      success: false,
      message: 'Failed to save lead form. Please try again.',
      errors: {
        general: 'Database error occurred while saving your information.'
      }
    }
  }
}
