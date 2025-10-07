'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getLeads, type Lead } from '@/actions/get-leads'
import { Container, PageContainer } from './styles'
import Sidebar from '@/components/sidebar'
import HeaderSection from '@/components/header-section'
import LeadsTable from '@/components/leads-table'

type SortField =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'createdAt'
  | 'status'
  | 'country'
type SortDirection = 'asc' | 'desc'

export default function LeadsPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const statusOptions = ['All', 'PENDING', 'REACHED_OUT']

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const result = await getLeads(
        currentPage,
        10,
        searchTerm,
        statusFilter,
        sortField,
        sortDirection
      )
      setLeads(result.leads)
      setTotalPages(Math.ceil(result.totalCount / 10))
    } catch {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    if (!token) {
      router.replace('/login')
    }
  }, [router])

  useEffect(() => {
    fetchLeads()
  }, [])

  const paginatedLeads = leads

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
    fetchLeads()
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    setCurrentPage(1)
    fetchLeads()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchLeads()
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
    fetchLeads()
  }

  return (
    <PageContainer>
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <Container>
        <HeaderSection
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          statusOptions={statusOptions}
          onSearch={handleSearch}
          onStatusChange={handleStatusFilter}
        />

        <LeadsTable
          leads={paginatedLeads}
          loading={loading}
          totalPages={totalPages}
          currentPage={currentPage}
          sortField={sortField}
          sortDirection={sortDirection}
          onPageChange={handlePageChange}
          onSort={handleSort}
          onStatusUpdated={fetchLeads}
        />
      </Container>
    </PageContainer>
  )
}
