'use client'
import Modal from "@/components/Modal/Modal"
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const NotePreview = ({ children }: Props) => {
  const router = useRouter();
  
  const close = () => router.back();

  return (
    <Modal onClose={close}>
        {children}
    </Modal>
  );
};

export default NotePreview;