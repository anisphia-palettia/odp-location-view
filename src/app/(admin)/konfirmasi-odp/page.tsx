'use client';

import Link from 'next/link';
import {useWhatsappGroups} from "@/hooks/useWhatsappGroups";

export default function KonfirmasiOdpPage() {
    const {data, error, isLoading} = useWhatsappGroups();

    if (isLoading) return (
        <div className="flex justify-center py-8">
            <span className="loading loading-spinner text-primary"></span>
        </div>
    );

    if (error) return (
        <p className="text-error text-center text-lg">Error: {error.message}</p>
    );

    const filteredGroups = data
        ?.filter((group) => group.name.toLowerCase().endsWith("group"))
        .sort((a, b) => a.name.localeCompare(b.name));

    const totalIsNotAcceptedODP = filteredGroups?.reduce(
        (sum, group) => sum + (group.totalIsNotAccepted ?? 0),
        0
    );

    return (
        <>
            <h1 className="font-bold mb-4">Konfirmasi ODP</h1>

            <div className="overflow-x-auto  rounded-lg shadow">
                <table className="table w-full table-zebra">
                    <thead className="font-semibold">
                    <tr>
                        <th>No</th>
                        <th>Nama Group</th>
                        <th>Total yang Belum di ACC</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {filteredGroups?.map((group, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{group.name}</td>
                            <td className={group.totalIsNotAccepted === 0 ? "" : "text-error"}>{group.totalIsNotAccepted ?? "-"}</td>
                            <td>
                                <Link href={`/konfirmasi-odp/${group.chatId}`}
                                      className={"btn btn-sm btn-primary"}>
                                    Lihat
                                </Link>
                            </td>
                        </tr>
                    ))}
                    <tr className="font-bold bg-base-200">
                        <td colSpan={2}>Total</td>
                        <td>{totalIsNotAcceptedODP}</td>
                        <td>—</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
