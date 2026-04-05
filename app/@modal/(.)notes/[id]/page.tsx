import { fetchNoteById } from "@/lib/api"
import NoteDetails from "@/app/notes/[id]/NoteDetails.client"
import ModalNote from "./ModalNote.client"
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
export default async function ModalPages({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ModalNote>
        <NoteDetails />
      </ModalNote>
    </HydrationBoundary>
  )};