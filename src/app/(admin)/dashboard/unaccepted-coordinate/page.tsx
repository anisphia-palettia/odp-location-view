'use client';

import Link from 'next/link'
import {useWhatsappGroups} from "@/hooks/useWhatsappGroups";

export default function UnacceptedCoordinate() {
    const {data, error, isLoading} = useWhatsappGroups()
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    const filteredGroups = data
        ?.filter((group) => group.name.toLowerCase().endsWith("group"))
        .sort((a, b) => a.name.localeCompare(b.name));

    const totalIsNotAcceptedODP = filteredGroups?.reduce(
        (sum, group) => sum + (group.totalIsNotAccepted ?? 0),
        0
    );

    return (
        <div className="tableWrapper">
            <table className="table">
                <thead className="tableHead">
                <tr>
                    <th className="th">No</th>
                    <th className="th">Nama Group</th>
                    <th className="th">Total yang belum di acc</th>
                    <th className="th">Detail</th>
                </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                {filteredGroups?.map((group, index) => (
                    <tr key={index} className="row">
                        <td className="td">{index + 1}</td>
                        <td className="td">{group.name}</td>
                        <td className="td">{group.totalIsNotAccepted ?? "-"}</td>
                        <td className="td text-blue-600 hover:underline cursor-pointer">
                            <Link href={`/dashboard/unaccepted-coordinate/${group.chatId}`}>Detail</Link>
                        </td>
                    </tr>
                ))}
                <tr className="row font-semibold bg-gray-50">
                    <td className="td" colSpan={2}>
                        Total
                    </td>
                    <td className="td">{totalIsNotAcceptedODP}</td>
                    <td className="td">—</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
