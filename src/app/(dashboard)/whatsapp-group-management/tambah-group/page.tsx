"use client";

import Table from "@/component/Table";
import { GroupService } from "@/service/group.service";
import useSWR from "swr";

export default function TambahGroupPage() {
  const {
    data: groups,
    isLoading,
    error,
    mutate,
  } = useSWR("group-chats", GroupService.whatsappGroupChats);
  return (
    <main>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Nama</th>
            <th>WhatsappChatId</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {groups?.length === 0 ? (
            <tr>
              <td colSpan={2} className="text-center">
                Tidak ada data
              </td>
            </tr>
          ) : (
            groups?.map((group, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{group.name}</td>
                <td>{group.id}</td>
                <td>
                  <button className="btn bg-primary">Tambah</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </main>
  );
}
