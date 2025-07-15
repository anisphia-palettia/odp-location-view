import Link from "next/link";
import Image from "next/image";

type CoordinateDetailModalProps = {
    modalId: string;
    coordinateId: number;
    imageUrl: string;
    handleAcc: (id: number) => void;
    handleReject: (id: number) => void;
}


export default function CoordinateDetailModal({
                                                  imageUrl,
                                                  handleReject,
                                                  handleAcc,
                                                  coordinateId,
                                                  modalId
                                              }: CoordinateDetailModalProps) {
    return (
        <dialog id={`${modalId}-detail`} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-2">Preview Gambar</h3>
                <Link href={imageUrl} target="_blank">
                    <Image
                        width={400}
                        height={400}
                        src={imageUrl}
                        alt="Preview"
                        className="w-full rounded mb-4"
                    />
                </Link>
                <div className="flex justify-end gap-2">
                    <form method="dialog" className="flex gap-2">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleAcc(coordinateId)}
                        >
                            ACC
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleReject(coordinateId)}
                        >
                            Tolak
                        </button>
                        <button type="submit" className="btn">
                            Tutup
                        </button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}