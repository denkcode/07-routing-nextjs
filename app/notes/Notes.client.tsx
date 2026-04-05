'use client'

import css from '@/app/App.module.css'
import NoteList from '@/components/NoteList/NoteList'
import { useState } from 'react'
import Pagination from '@/components/Pagination/Pagination';
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes, FetchNotesResponse } from '@/lib/api'
import Loader from '@/components/Loader/Loader'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
export default function Notes() {
      const [page, setPage] = useState(1);
      const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
        throwOnError: true,
        queryKey: ['notes', page, ''],
        queryFn: () => fetchNotes(page, ''),
        placeholderData: keepPreviousData,
})
    return (
        <div className={css.app}>
  {isLoading && <Loader />}
  {isError && <ErrorMessage message="Something went wrong!"/>}
  {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
  {data && data?.totalPages > 1 && (
  <Pagination
    totalPages={data?.totalPages}
    page={page}
    onPageChange={({ selected }) => setPage(selected + 1)}
  />
)}
</div>

    )
}