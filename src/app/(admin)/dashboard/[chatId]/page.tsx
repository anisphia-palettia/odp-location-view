'use client'
import {useParams} from "next/navigation";
import Link from "next/link";
import {formatDate} from "@/utils/format-date";
import {useWhatsappGroupCoordinate} from "@/hooks/useWhatsappGroups";
import Image from "next/image";
import UpdateCoordinateModal from "@/components/UpdateCoordinateModal";

export default function GroupDetailPage() {
    const {chatId} = useParams<{ chatId: string }>()

    const {data, error, isLoading} = useWhatsappGroupCoordinate(chatId);

    if (isLoading) return (
        <div className="flex justify-center py-8">
            <span className="loading loading-spinner text-primary"></span>
        </div>
    );

    if (error) return (
        <p className="text-error text-center text-lg">Error: {error.message}</p>
    );

    const filteredCoordinates = data?.coordinates?.filter((data) => data.isAccepted) ?? [];
    return (
        <>
            <h1 className="text-2xl font-bold mb-2">{data?.name ?? "Detail Group"}</h1>
            <h2 className="text-base mb-4">Total koordinat: {filteredCoordinates.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Waktu</th>
                        <th>Kordinat</th>
                        <th>Alamat</th>
                        <th>URL TimeMark</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {filteredCoordinates?.map((coordinate, index) => {
                        const imageUrl = `https://odp.tridatafiber.com/public/${data?.name}/${coordinate.image_name}`;
                        const modalId = `modal-${coordinate.id}`;
                        const takenAt = coordinate.photoTakenAt
                        const lng = coordinate.longitude
                        const lat = coordinate.latitude

                        const date = formatDate(takenAt)
                        return (
                            <tr key={index} className="row">
                                <td>{index + 1}</td>
                                <td>{date}</td>
                                <td>{`${coordinate.latitude}, ${coordinate.longitude}`}</td>
                                <td>{coordinate.address || "Tidak ada"} </td>
                                <td>
                                    {coordinate.urlId ? (
                                        <Link href={`https://Timemark.com/s/${coordinate.urlId}/8`} target="_blank"
                                              className="link">Link</Link>
                                    ) : (
                                        "Tidak ada"
                                    )}
                                </td>
                                <td>
                                    <div className={'flex flex-row gap-2 items-center'}>
                                        <button className="btn btn-primary btn-sm" onClick={() => {
                                            const dialog = document.getElementById(`${modalId}_detail`) as HTMLDialogElement | null;
                                            dialog?.showModal();
                                        }}>Detail
                                        </button>

                                        <button className="btn btn-secondary btn-sm" onClick={() => {
                                            const dialog = document.getElementById(`${modalId}_edit`) as HTMLDialogElement | null;
                                            dialog?.showModal();
                                        }}>Edit
                                        </button>
                                    </div>

                                    <UpdateCoordinateModal coordinateId={coordinate.id} modalId={modalId}
                                                           photoTakenAt={new Date(takenAt).toISOString()}
                                                           defaultAddress={coordinate.address}
                                                           imageUrl={imageUrl}/>


                                    <dialog id={`${modalId}_detail`} className="modal">
                                        <div className="modal-box w-11/12 max-w-3xl p-6">
                                            <h2 className="text-2xl font-bold mb-4">Detail</h2>
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <Link href={imageUrl} target="_blank" className="md:w-1/2">
                                                    <Image
                                                        width={400}
                                                        height={400}
                                                        src={imageUrl}
                                                        alt="Preview"
                                                        className="rounded-lg shadow-md w-full object-cover"
                                                    />
                                                </Link>
                                                <div className="md:w-1/2 flex flex-col justify-between">
                                                    <div>
                                                        <div className="space-y-2">
                                                            <div className="space-y-1">
                                                                <h4>Tanggal: </h4>
                                                                <p>{date}</p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <h4>Koordinat: </h4>
                                                                <p>{lat + ", " + lng}</p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <h4>Url Timemark</h4>
                                                                <p>{coordinate.urlId || "Tidak ada"}</p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <h4>Maps: </h4>
                                                                <Link
                                                                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                                                                    target="_blank"
                                                                    className="link underline "
                                                                >
                                                                    Lihat Lokasi di Google Maps 📍
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <form method="dialog">
                                                <button className="btn btn-primary">Tutup</button>
                                            </form>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>

                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {filteredCoordinates.length === 0 && (
                    <div className="text-center text-gray-500 mt-4">Data tidak di temukan</div>
                )}
            </div>
        </>
    );
}
