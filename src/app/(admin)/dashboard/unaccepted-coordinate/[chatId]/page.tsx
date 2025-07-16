'use client';

import {useParams} from "next/navigation";
import {useWhatsappGroupCoordinate} from "@/hooks/useWhatsappGroups";
import {WhatsappCoordinateService} from "@/services/whatsapp.service";
import {mutate} from "swr";
import {logger} from "@/lib/logger";
import {formatDate} from "@/utils/format-date";
import Link from "next/link";
import EditModal from "@/components/EditModal";
import CoordinateDetailModal from "@/components/CoordinateDetailModal";

export default function UnacceptedCoordinateDetailPage() {
    const {chatId} = useParams<{ chatId: string }>();
    const {data, error, isLoading} = useWhatsappGroupCoordinate(chatId);

    const handleAcc = async (id: number) => {
        try {
            await WhatsappCoordinateService().update(id, {isAccepted: true});
            await mutate("whatsapp-coordinate-group");
        } catch (error) {
            logger.error("Failed to acc coordinate:", error);
        }
    };

    const handleReject = async (id: number) => {
        try {
            await WhatsappCoordinateService().update(id, {isReject: true});
            await mutate("whatsapp-coordinate-group");
        } catch (error) {
            logger.error("Failed to reject coordinate:", error);
        }
    };

    if (isLoading) return (
        <div className="flex justify-center py-8">
            <span className="loading loading-spinner text-primary"></span>
        </div>
    );

    if (error) return (
        <p className="text-error text-center text-lg">Error: {error.message}</p>
    );

    const filteredCoordinates = data?.coordinates?.filter(coord => !coord.isAccepted && !coord.isReject) ?? [];

    return (
        <>
            <h1 className="text-2xl font-bold mb-2">{data?.name}</h1>
            <h2 className="mb-4">Total yang belum di acc: {filteredCoordinates.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Waktu</th>
                        <th>Kordinat</th>
                        <th>Alamat</th>
                        <th>Google Maps</th>
                        <th>URL TimeMark</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>
                    <tbody className="text-sm">
                    {filteredCoordinates.map((coordinate, index) => {
                        const imageUrl = `https://odp.tridatafiber.com/public/${data?.name}/${coordinate.image_name}`;
                        const modalId = `modal-${coordinate.id}`;
                        const lat = coordinate.latitude
                        const lng = coordinate.longitude
                        const takenAt = coordinate.photoTakenAt

                        const date = formatDate(takenAt)

                        return (
                            <tr key={coordinate.id}>
                                <td>{index + 1}</td>
                                <td>{date}</td>
                                <td>{`${lat}, ${lng}`}</td>
                                <td>{coordinate.address || "Tidak ada"}</td>
                                <td>
                                    <Link href={`https://www.google.com/maps?q=${lat},${lng}`} className={"underline"}
                                          target="_blank">Link</Link>
                                </td>
                                <td>
                                    {coordinate.urlId ? (
                                        <Link
                                            href={`https://Timemark.com/s/${coordinate.urlId}/8`}
                                            target="_blank"
                                            className="link"
                                        >
                                            Link
                                        </Link>
                                    ) : (
                                        "Tidak ada"
                                    )}
                                </td>
                                <td>
                                    <div className="space-x-2">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => {
                                                const dialog = document.getElementById(`${modalId}-detail`) as HTMLDialogElement | null;
                                                dialog?.showModal();
                                            }}
                                        >
                                            Lihat
                                        </button>
                                        <button className="btn btn-sm btn-secondary" onClick={() => {
                                            const dialog = document.getElementById(`${modalId}-edit`) as HTMLDialogElement | null;
                                            dialog?.showModal();
                                        }}>Edit
                                        </button>
                                    </div>

                                    <EditModal coordinateId={coordinate.id} defaultAddress={coordinate.address}
                                               modalId={`${modalId}-edit`}
                                               photoTakenAt={new Date(takenAt).toISOString()}
                                               imageUrl={imageUrl}/>

                                    <CoordinateDetailModal
                                        modalId={`modal-${coordinate.id}`}
                                        coordinateId={coordinate.id}
                                        imageUrl={imageUrl}
                                        handleAcc={handleAcc}
                                        handleReject={handleReject}
                                    />


                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                {filteredCoordinates.length === 0 && (
                    <div className="text-center text-gray-500 mt-4">Belum ada koordinat yang di-ACC untuk grup
                        ini.</div>
                )}
            </div>
        </>
    );
}
