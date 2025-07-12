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
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const {chatId} = useParams<{ chatId: string }>()

    const {data, error, isLoading} = useWhatsappGroupCoordinate(chatId);

    const handleAcc = async (id: number) => {
        try {
            await WhatsappCoordinateService().update(id, {isAccepted: true})
            await mutate("whatsapp-coordinate-group")
        } catch (error) {
            logger.error("Failed to acc coordinate:", error);
        }
    }


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
                                <th className='th'>Gambar</th>
                                <th className="th">Aksi</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                            {filteredCoordinates?.map((coordinate, index) => {
                                const isHovered = hoverIndex === index;
                                return (
                                    <tr key={index} className="row" onMouseEnter={() => setHoverIndex(index)}>
                                        <td className='td'>{index + 1}</td>
                                        <td className="td">{formatDate(coordinate.createdAt)}</td>
                                        <td className='td'>{`${coordinate.latitude}, ${coordinate.longitude}`}</td>
                                        <td className='td'>{coordinate.address || "Tidak ada"} </td>
                                        <td className='td'>
                                            {coordinate.urlId ? (
                                                <Link href={`https://Timemark.com/s/${coordinate.urlId}/8`}>Link</Link>
                                            ) : (
                                                "Tidak ada"
                                            )}
                                        </td>
                                        <td className='td'>
                                            {isHovered && data ? (
                                                <Link
                                                    href={`https://odp.tridatafiber.com/public/${data.name}/${coordinate.image_name}`}>
                                                    <img
                                                        src={`https://odp.tridatafiber.com/public/${data.name}/${coordinate.image_name}`}
                                                        alt={coordinate.image_name}
                                                        width={100}
                                                        height={100}
                                                        loading="lazy"
                                                        className="rounded shadow"
                                                    />
                                                </Link>
                                            ) : (
                                                <span className="text-gray-400 italic">Arahkan kursor</span>
                                            )}
                                        </td>
                                        <td className="td">
                                            <div className="flex flex-col gap-2">
                                                <button className="btn-blue" onClick={() => handleAcc(coordinate.id)}>Acc
                                                </button>
                                                <button className="btn-red">Tolak</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    ) :
                    <div>Tidak ada data</div>
                }
            </div>
        </>
    );
}
