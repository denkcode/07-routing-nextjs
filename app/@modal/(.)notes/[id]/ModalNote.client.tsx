'use client'
import Modal from "@/components/Modal/Modal"
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const ModalNote = ({ children }: Props) => {
  const router = useRouter();
  
  const close = () => router.back();

  return (
    <Modal onClose={close}>
        {children}
    </Modal>
  );
};

export default ModalNote;