'use client'
import {useParams} from "next/navigation";
import {DefaultResponse, GroupResponse} from "@/types/response";
import useSWR from "swr";
import {API} from "@/constant/api";
import {getData} from "@/lib/api";
import {useState} from "react";
import Link from "next/link";
import {formatDate} from "@/utils/format-date";

export default function GroupDetail() {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const {chatId} = useParams<{ chatId: string }>()
    const {data, error, isLoading} = useSWR<DefaultResponse<GroupResponse>>(
        API.groups.detail(decodeURIComponent(chatId)),
        getData
    )
    const groupDetail = data?.data;

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    const filteredCoordinates = groupDetail?.coordinates?.filter((data) => data.isAccepted) ?? [];
    return (
        <>
            <h1>{groupDetail?.name ?? ""}</h1>
            {groupDetail?.coordinates && (
                <h2>Total koordinat: {filteredCoordinates.length}</h2>
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
                                        {isHovered && groupDetail ? (
                                            <Link
                                                href={`https://odp.tridatafiber.com/public/${groupDetail.name}/${coordinate.image_name}`}>
                                                <img
                                                    src={`https://odp.tridatafiber.com/public/${groupDetail.name}/${coordinate.image_name}`}
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
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                ) : <div>Tidak ada data</div>}
            </div>
        </>
    );
}
