"use client"

import Table from "@/component/Table";
import useSWR from "swr";
import {GroupService} from "@/service/group.service";
import {usePathname} from "next/navigation";

export default function VerifikasiOdp() {
    const pathName = usePathname();
    const {data: groups} = useSWR("group-get-all", GroupService.getSummary);
    return (
        <main className={"space-y-4"}>
            <h1>Verifikasi ODP</h1>
            <Table>
                <thead>
                <tr>
                    <th></th>
                    <th>Teknisi</th>
                    <th>Jumlah ODP</th>
                    <th>Detail</th>
                </tr>
                </thead>
                <tbody>
                {groups?.map((group, idx) => (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{group.name}</td>
                        <td>{group.totalIsNotAccepted}</td>
                        <td>
                            <a href={`${pathName}/${group.id}`} className={"btn bg-primary btn-sm"}>Detail</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </main>
    )
}