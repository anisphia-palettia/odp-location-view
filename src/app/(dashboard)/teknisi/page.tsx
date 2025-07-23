"use client";
import useSWR from "swr";
import {GroupService} from "@/service/group.service";
import Table from "@/component/Table";
import {usePathname} from "next/navigation";

export default function TeknisiPage() {
    const pathName = usePathname();
    const {
        data: groupsSummary,
        error,
        isLoading,
    } = useSWR("group-get-all", GroupService.getSummary);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <main>
            <h1>Letak ODP Teknisi</h1>
            <Table>
                <thead>
                <tr>
                    <th></th>
                    <th>Nama</th>
                    <th>Jumlah ODP</th>
                    <th>Detail</th>
                </tr>
                </thead>
                <tbody>
                {groupsSummary?.map((group, idx) => (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{group.name}</td>
                        <td>{group.totalCoordinates}</td>
                        <td>
                            <a href={`${pathName}/${group.id}`} className={"btn bg-primary btn-sm"}>Detail</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </main>
    );
}
