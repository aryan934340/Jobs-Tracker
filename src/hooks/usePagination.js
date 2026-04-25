import { useState, useMemo } from 'react'

export function usePagination(items, pageSize = 8) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(page, totalPages)

  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, currentPage, pageSize])

  const goTo = (p) => setPage(Math.max(1, Math.min(p, totalPages)))

  return { paged, page: currentPage, totalPages, goTo, setPage }
}
