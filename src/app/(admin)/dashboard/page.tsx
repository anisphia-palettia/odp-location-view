'use client';

import Link from 'next/link';
import {useWhatsappGroups} from '@/hooks/useWhatsappGroups';

export default function DashboardPage() {
    const {data, error, isLoading} = useWhatsappGroups();

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <p className="text-error text-center text-lg">Error: {error.message}</p>
        );
    }

    const filteredGroups = data
        ?.filter((group) => group.name.toLowerCase().endsWith('group'))
        .sort((a, b) => a.name.localeCompare(b.name));

    const totalODP = filteredGroups?.reduce(
        (sum, group) => sum + (group.totalCoordinates ?? 0),
        0
    );

    return (
        <>
            <h1 className="font-bold mb-4">Data Seluruh Teknisi</h1>

            <div className="mb-4">
                <Link href="/dashboard/unaccepted-coordinate" className="btn btn-sm btn-primary">
                    Lihat yang belum di ACC
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="table w-full table-zebra">
                    <thead className="font-semibold">
                    <tr>
                        <th>No</th>
                        <th>Nama Group</th>
                        <th>Total seluruh ODP</th>
                        <th>Detail</th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {filteredGroups?.map((group, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{group.name}</td>
                            <td>{group.totalCoordinates ?? '-'}</td>
                            <td>
                                <Link
                                    href={`/dashboard/${group.chatId}`}
                                    className="btn btn-sm btn-primary"
                                >
                                    Detail
                                </Link>
                            </td>
                        </tr>
                    ))}
                    <tr className="font-bold bg-base-200">
                        <td colSpan={2}>Total</td>
                        <td>{totalODP}</td>
                        <td>—</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
