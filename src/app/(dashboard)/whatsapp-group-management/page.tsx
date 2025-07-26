"use client";

import AlertModal from "@/component/AlertModal";
import Table from "@/component/Table";
import { GroupService } from "@/service/group.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWhatsappGroupManagementStore } from "@/stores/whatsapp-group-management-store";
import LoadingState from "@/component/ui/LoadingState";
import ErrorState from "@/component/ui/ErrorState";

export default function WhatsappGroupManagementPage() {
  const pathName = usePathname();
  const deleteModalId = "delete-modal";
  const queryClient = useQueryClient();

  const { groupId, setGroupId } = useWhatsappGroupManagementStore();

  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: GroupService.getAll,
  });

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  const handleDelete = async () => {
    if (!groupId) return;
    try {
      await GroupService.delete(groupId);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    } catch (err) {
      console.error("Gagal menghapus:", err);
    } finally {
      setGroupId(null);
      (document.getElementById(deleteModalId) as HTMLDialogElement)?.close();
    }
  };

  return (
    <main className="space-y-4">
      <h1 className="underline">Management Whatsapp Group</h1>
      <Link href={`${pathName}/tambah-group`} className={"btn bg-primary"}>
        Tambah group
      </Link>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nama</th>
            <th>WhatsappChatId</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {groups?.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                Tidak ada data
              </td>
            </tr>
          ) : (
            groups?.map((group, idx) => (
              <tr key={group.id}>
                <td>{idx + 1}</td>
                <td>{group.name}</td>
                <td>{group.chatId}</td>
                <td>
                  <button
                    className="btn bg-secondary btn-sm"
                    onClick={() => {
                      setGroupId(group.id);
                      (
                        document.getElementById(
                          deleteModalId
                        ) as HTMLDialogElement
                      )?.showModal();
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <AlertModal
        id={deleteModalId}
        label="Konfirmasi Menghapus Group"
        text="Apabila group dihapus, WhatsApp tidak akan memonitoring link ODP lagi. Apakah Anda yakin ingin menghapus?"
      >
        <div className="modal-action">
          <form method="dialog" className="space-x-2">
            <button
              className="btn bg-secondary"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            >
              Ya, Hapus
            </button>
            <button
              className="btn"
              onClick={() => {
                setGroupId(null);
              }}
            >
              Batal
            </button>
          </form>
        </div>
      </AlertModal>
    </main>
  );
}
