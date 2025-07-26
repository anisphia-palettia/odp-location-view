"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useShowImageModalStore } from "@/stores/show-image-modal-store";

type Props = {
  id: string;
};

export default function ShowImageModal({ id }: Props) {
  const { imageUrl, closeModal } = useShowImageModalStore();
    const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (imageUrl && modal && !modal.open) modal.showModal();
    if (!imageUrl && modal?.open) modal.close();
  }, [imageUrl]);

  if (!imageUrl) return null;

  return (
    <dialog id={id} className="modal" ref={modalRef} onClose={closeModal}>
      <div className="modal-box p-4 overflow-auto">
        <h3 className="font-bold text-lg mb-4">Pratinjau Gambar</h3>
        <Image
          src={imageUrl}
          alt="Preview"
          unoptimized
          width={800}
          height={600}
          className="rounded-md object-contain "
        />
        <div className="modal-action mt-4">
          <button className="btn btn-neutral" onClick={closeModal}>
            Tutup
          </button>
        </div>
      </div>
      <form
        method="dialog"
        onClick={closeModal}
        className="modal-backdrop"
      ></form>
    </dialog>
  );
}
