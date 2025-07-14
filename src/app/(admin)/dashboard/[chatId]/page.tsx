'use client'
import {useParams} from "next/navigation";
import Link from "next/link";
import {formatDate} from "@/utils/format-date";
import {useWhatsappGroupCoordinate} from "@/hooks/useWhatsappGroups";

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
                        <th>Gambar</th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {filteredCoordinates?.map((coordinate, index) => {
                        const imageUrl = `https://odp.tridatafiber.com/public/${data?.name}/${coordinate.image_name}`;
                        const modalId = `modal-${coordinate.id}`;
                        return (
                            <tr key={index} className="row">
                                <td>{index + 1}</td>
                                <td>{formatDate(coordinate.createdAt)}</td>
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
                                    <button className="btn btn-primary btn-sm" onClick={() => {
                                        const dialog = document.getElementById(modalId) as HTMLDialogElement | null;
                                        dialog?.showModal();
                                    }}>Detail
                                    </button>

                                    <dialog id={modalId} className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg mb-2">Preview Gambar</h3>
                                            <Link href={imageUrl} target="_blank">
                                                <img src={imageUrl} alt="Preview" className="w-full rounded mb-4"/>
                                            </Link>
                                            <div className="flex justify-end gap-2">
                                                <form method="dialog" className={"flex gap-2"}>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => {
                                                        }}
                                                    >
                                                        ACC
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                        }}
                                                    >
                                                        Tolak
                                                    </button>
                                                    <button className="btn ">Tutup</button>
                                                </form>
                                            </div>
                                        </div>
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
