'use client'

import css from '@/app/App.module.css'
import NoteList from '@/components/NoteList/NoteList'
import { useState } from 'react'
import Pagination from '@/components/Pagination/Pagination';
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes, FetchNotesResponse } from '@/lib/api'
import Modal from '@/components/Modal/Modal';
import { useDebouncedCallback } from 'use-debounce'
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import NoteForm from '@/components/NoteForm/NoteForm';
export default function Notes() {
      const [search, setSearch] = useState('');
      const [page, setPage] = useState(1);
      const debouncedSearch = useDebouncedCallback((value: string) => {
      setSearch(value);
      setPage(1);
      }, 300);
      const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
        throwOnError: true,
        queryKey: ['notes', page, search],
        queryFn: () => fetchNotes(page, search),
        placeholderData: keepPreviousData,
})
const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox value={search} onChange={debouncedSearch} />
		<button className={css.button} onClick={() => setIsModalOpen(true)}>
      Create note +</button>
  </header>
  {isLoading && <Loader />}
  {isError && <ErrorMessage message="Something went wrong!"/>}
  {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
  {isModalOpen && (
  <Modal onClose={() => setIsModalOpen(false)}>
    <NoteForm onClose={() => setIsModalOpen(false)} />
  </Modal>
)}
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