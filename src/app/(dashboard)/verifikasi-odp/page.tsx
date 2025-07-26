"use client";

import Table from "@/component/Table";
import { GroupService } from "@/service/group.service";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import LoadingState from "@/component/ui/LoadingState";
import ErrorState from "@/component/ui/ErrorState";

export default function VerifikasiOdp() {
  const pathName = usePathname();
  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["group-get-all"],
    queryFn: GroupService.getSummary,
  });

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

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
                <a
                  href={`${pathName}/${group.id}`}
                  className={"btn bg-primary btn-sm"}
                >
                  Detail
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
}
