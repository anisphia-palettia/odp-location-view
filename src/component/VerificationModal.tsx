import { useVerificationAndEditModalStore } from "@/stores/verification-and-edit-modal-store";
import { useEffect, useRef } from "react";
import CoordinateUpdateForm from "./CoordinateUpdateForm";
import Image from "next/image";

export default function VerificationModal({ id }: { id: string }) {
  const { data, imageUrl, closeModal } = useVerificationAndEditModalStore();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (data && !modal.open) {
      modal.showModal();
    } else if (!data && modal.open) {
      modal.close();
    }

    const handleClose = () => closeModal();
    modal.addEventListener("close", handleClose);

    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, [data, closeModal]);

  if (!data) return null;

  return (
    <dialog id={id} className="modal" ref={modalRef}>
      <div className="modal-box flex flex-col gap-4">
        <h3>Verifikasi ODP</h3>
        {imageUrl ? (
          <Image
            width={200}
            height={200}
            alt="Image Source"
            src={imageUrl}
            className="w-full"
          />
        ) : (
          <div>Tidak ada</div>
        )}{" "}
        <CoordinateUpdateForm
          data={data}
          onSubmit={(data) => {
            console.log(data);
            closeModal();
          }}
        />
        <div className="modal-action">
          <button className="btn btn-neutral" onClick={closeModal}>
            Tutup
          </button>
          <button
            className="btn btn-primary"
            form="coordinate-form"
            type="submit"
          >
            Simpan
          </button>
        </div>
      </div>
    </dialog>
  );
}
