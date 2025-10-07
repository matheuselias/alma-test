'use client'

import { SearchIcon, ArrowDown } from 'lucide-react'
import {
  HeaderSection as HeaderWrap,
  Title,
  SearchContainer,
  SearchInput,
  FilterSelect
} from './styles'

export const STATUS_OPTIONS = {
  All: 'All',
  PENDING: 'pending',
  REACHED_OUT: 'reached out'
}

type HeaderSectionProps = {
  searchTerm: string
  statusFilter: string
  statusOptions: string[]
  onSearch: (value: string) => void
  onStatusChange: (value: string) => void
}

export default function HeaderSection({
  searchTerm,
  statusFilter,
  statusOptions,
  onSearch,
  onStatusChange
}: HeaderSectionProps) {
  return (
    <HeaderWrap>
      <Title>Leads</Title>

      <SearchContainer>
        <SearchInput>
          <SearchIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </SearchInput>

        <FilterSelect>
          <ArrowDown className="select-icon" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {STATUS_OPTIONS[option as keyof typeof STATUS_OPTIONS]}
              </option>
            ))}
          </select>
        </FilterSelect>
      </SearchContainer>
    </HeaderWrap>
  )
}
