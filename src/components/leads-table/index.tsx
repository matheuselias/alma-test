'use client'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { STATUS_OPTIONS } from '@/components/header-section'
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
  PaginationContainer,
  PaginationButton,
  PaginationNumber
} from './styles'
import type { Lead } from '@/actions/get-leads'
import { updateLeadStatus } from '@/actions/get-leads'
import { Badge, Button } from '@/components/ui'

export enum LeadStatus {
  PENDING = 'PENDING',
  REACHED_OUT = 'REACHED_OUT'
}
type LeadsTableProps = {
  leads: Lead[]
  loading: boolean
  totalPages: number
  currentPage: number
  sortField:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'createdAt'
    | 'status'
    | 'country'
  sortDirection: 'asc' | 'desc'
  onPageChange: (page: number) => void
  onSort: (field: LeadsTableProps['sortField']) => void
  onStatusUpdated: () => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return '#f59e0b'
    case 'REACHED_OUT':
      return '#3b82f6'
    default:
      return '#6b7280'
  }
}

const formatDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(dateObj)
}

export default function LeadsTable({
  leads,
  loading,
  totalPages,
  currentPage,
  sortField,
  sortDirection,
  onPageChange,
  onSort,
  onStatusUpdated
}: LeadsTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell onClick={() => onSort('firstName')}>
              Name
              {sortField === 'firstName' && (
                <span className="sort-icon">
                  {sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}
                </span>
              )}
            </TableHeaderCell>
            <TableHeaderCell onClick={() => onSort('email')}>
              Email
              {sortField === 'email' && (
                <span className="sort-icon">
                  {sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}
                </span>
              )}
            </TableHeaderCell>
            <TableHeaderCell onClick={() => onSort('createdAt')}>
              Submitted
              {sortField === 'createdAt' && (
                <span className="sort-icon">
                  {sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}
                </span>
              )}
            </TableHeaderCell>
            <TableHeaderCell>Visa Categories</TableHeaderCell>
            <TableHeaderCell onClick={() => onSort('status')}>
              Status
              {sortField === 'status' && (
                <span className="sort-icon">
                  {sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}
                </span>
              )}
            </TableHeaderCell>
            <TableHeaderCell onClick={() => onSort('country')}>
              Country
              {sortField === 'country' && (
                <span className="sort-icon">
                  {sortDirection === 'asc' ? <ArrowUp /> : <ArrowDown />}
                </span>
              )}
            </TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={7}
                style={{ textAlign: 'center', padding: '2rem' }}
              >
                Loading leads...
              </TableCell>
            </TableRow>
          ) : leads.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                style={{ textAlign: 'center', padding: '2rem' }}
              >
                No leads found
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  {lead.firstName} {lead.lastName}
                </TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{formatDate(lead.createdAt)}</TableCell>
                <TableCell>
                  {[
                    lead.visaO1 ? 'O-1' : null,
                    lead.visaEb1a ? 'EB-1A' : null,
                    lead.visaEb2niw ? 'EB-2 NIW' : null,
                    lead.visaDontKnow ? "I don't know" : null
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </TableCell>
                <TableCell>
                  <Badge color={getStatusColor(lead.status)}>
                    {STATUS_OPTIONS[lead.status as keyof typeof STATUS_OPTIONS]}
                  </Badge>
                </TableCell>
                <TableCell>{lead.country}</TableCell>
                <TableCell>
                  {lead.status === LeadStatus.PENDING && (
                    <Button
                      fullWidth={false}
                      onClick={async () => {
                        await updateLeadStatus(lead.id, LeadStatus.REACHED_OUT)
                        onStatusUpdated()
                      }}
                    >
                      Mark reached out
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </tbody>
      </Table>

      <PaginationContainer>
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </PaginationButton>

        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
          const page = i + 1
          return (
            <PaginationNumber
              key={page}
              active={currentPage === page}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationNumber>
          )
        })}

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </PaginationButton>
      </PaginationContainer>
    </TableContainer>
  )
}
