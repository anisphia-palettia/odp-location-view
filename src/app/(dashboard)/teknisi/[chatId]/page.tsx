"use client"

import {usePathname} from "next/navigation";
import useSWR from "swr";
import {GroupService} from "@/service/group.service";
import Table from "@/component/Table";
import Link from "next/link";
import {formatDate} from "@/utils/format-date";
import BackBtn from "@/component/BackBtn";
import {useState} from "react";
import DetailAndEditCoordinateModal from "@/component/DetailAndEditCoordinateModal";
import {CoordinateItem} from "@/types/coordinate";

export default function TeknisiDetailPage() {
    const pathname = usePathname();
    const groupId = pathname.split("/").pop();
    const editModalId = 'edit-modal'

    const [data, setData] = useState<CoordinateItem | null>(null);


    const {data: detail, error} = useSWR(
        groupId ? `group-coordinates-${groupId}` : null,
        () => GroupService.getGroupCoordinates(Number(groupId))
    );

    return (
        <main className={'space-y-4'}>
            <BackBtn/>
            <h1>Detail Lokasi ODP</h1>
            <h2>{detail?.name}</h2>
            <Table>
                <thead>
                <tr>
                    <th></th>
                    <th>Di upload</th>
                    <th>Coordinate</th>
                    <th>Alamat</th>
                    <th>Timemark URL</th>
                    <th>Google Maps</th>
                    <th>Aksi</th>
                </tr>
                </thead>
                <tbody>
                {detail?.coordinates.map((coordinate, idx) => (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{formatDate(coordinate.photoTakenAt)}</td>
                        <td>{coordinate.lat}, {coordinate.long}</td>
                        <td>{coordinate.address ?? "Tidak ada"}</td>
                        <td>
                            {coordinate.urlId ? (
                                <Link
                                    href={`https://timemark.com/s/${coordinate.urlId}/8`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Link
                                </Link>
                            ) : (
                                "Tidak ada"
                            )}
                        </td>
                        <td>
                            <Link
                                href={`https://www.google.com/maps?q=${coordinate.lat},${coordinate.long}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Link
                            </Link>
                        </td>
                        <td>
                            <button className={"btn btn-sm bg-primary"} onClick={() => {
                                setData(coordinate);
                                (
                                    document.getElementById(
                                        editModalId
                                    ) as HTMLDialogElement
                                )?.showModal();
                            }}>Lihat Gambar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <DetailAndEditCoordinateModal id={editModalId} data={data} groupName={detail?.name}/>
        </main>
    );
}
