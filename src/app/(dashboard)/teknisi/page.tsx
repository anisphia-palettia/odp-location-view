"use client";
import { GroupService } from "@/service/group.service";
import Table from "@/component/Table";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function TeknisiPage() {
  const pathName = usePathname();

  const { data: groupsSummary } = useQuery({
    queryKey: ["group-get-all"],
    queryFn: GroupService.getSummary,
  });

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
