'use client'
import {useParams} from "next/navigation";
import {useState} from "react";
import Link from "next/link";
import {formatDate} from "@/utils/format-date";
import {useWhatsappGroupCoordinate} from "@/hooks/useWhatsappGroups";
import {WhatsappCoordinateService} from "@/services/whatsapp.service";
import {mutate} from "swr";
import {logger} from "@/lib/logger";

export default function UnacceptedCoordinateDetail() {
    const [modalImage, setModalImage] = useState<string | null>(null);
    const [modalCoordinateId, setModalCoordinateId] = useState<number | null>(null);
    const {chatId} = useParams<{ chatId: string }>();

    const {data, error, isLoading} = useWhatsappGroupCoordinate(chatId);

    const handleAcc = async (id: number) => {
        try {
            await WhatsappCoordinateService().update(id, {isAccepted: true});
            await mutate("whatsapp-coordinate-group");
            setModalImage(null);
        } catch (error) {
            logger.error("Failed to acc coordinate:", error);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    const filteredCoordinates = data?.coordinates?.filter((data) => !data.isAccepted) ?? [];

    return (
        <>
            <h1>{data?.name ?? ""}</h1>
            {data?.coordinates && (
                <h2>Total yang belum di acc: {filteredCoordinates.length}</h2>
            )}

            <div className="tableWrapper">
                {filteredCoordinates.length > 0 ? (
                    <table className="table">
                        <thead className="tableHead">
                        <tr>
                            <th className='th'>No</th>
                            <th className="th">Waktu</th>
                            <th className='th'>Kordinat</th>
                            <th className='th'>Alamat</th>
                            <th className="th">URL TimeMark</th>
                            <th className="th">Aksi</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                        {filteredCoordinates?.map((coordinate, index) => (
                            <tr key={index} className="row" >
                                <td className='td'>{index + 1}</td>
                                <td className="td">{formatDate(coordinate.createdAt)}</td>
                                <td className='td'>{`${coordinate.latitude}, ${coordinate.longitude}`}</td>
                                <td className='td'>{coordinate.address || "Tidak ada"}</td>
                                <td className='td'>
                                    {coordinate.urlId ? (
                                        <Link href={`https://Timemark.com/s/${coordinate.urlId}/8`} target="_blank">
                                            Link
                                        </Link>
                                    ) : (
                                        "Tidak ada"
                                    )}
                                </td>
                                <td className="td">
                                    <button
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        onClick={() => {
                                            const imageUrl = `https://odp.tridatafiber.com/public/${data?.name}/${coordinate.image_name}`;
                                            setModalImage(imageUrl);
                                            setModalCoordinateId(coordinate.id);
                                        }}
                                    >
                                        Lihat
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div>Tidak ada data</div>
                )}
            </div>

            {/* Modal Gambar */}
            {modalImage && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-700"
                            onClick={() => setModalImage(null)}
                        >
                            ✕
                        </button>

                        <img
                            src={modalImage}
                            alt="Preview"
                            className="rounded w-full mb-4"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    if (modalCoordinateId) handleAcc(modalCoordinateId);
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                ACC
                            </button>
                            <button
                                onClick={() => {
                                    console.log("Tolak clicked - implementasi menyusul");
                                    setModalImage(null);
                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Tolak
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
