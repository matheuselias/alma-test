'use server'

import { prisma } from '@/lib/prisma'

export enum LeadStatus {
  PENDING = 'PENDING',
  REACHED_OUT = 'REACHED_OUT'
}

export type Lead = {
  id: string
  firstName: string
  lastName: string
  email: string
  country: string
  status: LeadStatus
  createdAt: Date
  visaO1: boolean
  visaEb1a: boolean
  visaEb2niw: boolean
  visaDontKnow: boolean
  helpDescription: string
}

export async function getLeads(
  page: number = 1,
  limit: number = 10,
  search?: string,
  status?: string,
  sortField: string = 'createdAt',
  sortDirection: 'asc' | 'desc' = 'desc'
): Promise<{ leads: Lead[]; totalCount: number }> {
  try {
    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { country: { contains: search } }
      ]
    }

    if (status && status !== 'All') {
      where.status = status
    }

    const [leads, totalCount] = await Promise.all([
      prisma.leadForm.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortField]: sortDirection },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          country: true,
          status: true,
          createdAt: true,
          visaO1: true,
          visaEb1a: true,
          visaEb2niw: true,
          visaDontKnow: true,
          helpDescription: true
        }
      }),
      prisma.leadForm.count({ where })
    ])

    const leadsWithStatus: Lead[] = leads.map((lead) => ({
      ...lead,
      status: lead.status as LeadStatus
    }))

    return {
      leads: leadsWithStatus,
      totalCount
    }
  } catch (error) {
    console.error('Error fetching leads:', error)
    return {
      leads: [],
      totalCount: 0
    }
  }
}

export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus
): Promise<{ success: boolean; message: string }> {
  try {
    await prisma.leadForm.update({
      where: { id: leadId },
      data: {
        status: status,
        updatedAt: new Date()
      }
    })

    return {
      success: true,
      message: 'Lead status updated successfully'
    }
  } catch (error) {
    console.error('Error updating lead status:', error)
    return {
      success: false,
      message: 'Failed to update lead status'
    }
  }
}
