"use client";

import Table from "@/component/Table";
import { GroupService } from "@/service/group.service";
import AlertModal from "@/component/AlertModal";
import BackBtn from "@/component/BackBtn";
import { useWhatsappGroupCreateStore } from "@/stores/whatsapp-group-create-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingState from "@/component/ui/LoadingState";
import ErrorState from "@/component/ui/ErrorState";

export default function TambahGroupPage() {
  const tambahModalId = "tambah-modal";
  const queryClient = useQueryClient();

  const { targetChatId, setTargetChatId } = useWhatsappGroupCreateStore();

  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["group-chats"],
    queryFn: GroupService.whatsappGroupChats,
  });

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  const handleAdd = async () => {
    if (!targetChatId) return;
    try {
      await GroupService.create(targetChatId);
      queryClient.invalidateQueries({ queryKey: ["group-chats"] });
    } catch (err) {
      console.error("Gagal menambah group:", err);
    } finally {
      setTargetChatId(null);
      (document.getElementById(tambahModalId) as HTMLDialogElement)?.close();
    }
  };

  return (
    <main className="space-y-4">
      <BackBtn />
      <h1>Tambah Group</h1>

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
              <td colSpan={4} className="text-center">
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
                  <button
                    className="btn bg-primary btn-sm"
                    onClick={() => {
                      setTargetChatId(group.id);
                      (
                        document.getElementById(
                          tambahModalId
                        ) as HTMLDialogElement
                      )?.showModal();
                    }}
                  >
                    Tambah
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <AlertModal
        id={tambahModalId}
        label="Konfirmasi Menambah Group"
        text="Apabila group ditambah maka setiap chat yang mengandung URL Timemark akan masuk ke database. Apakah Anda yakin?"
      >
        <div className="modal-action">
          <form method="dialog" className="space-x-2">
            <button
              className="btn bg-primary"
              onClick={(e) => {
                e.preventDefault();
                handleAdd();
              }}
            >
              Ya Yakin
            </button>
            <button className="btn" onClick={() => setTargetChatId(null)}>
              Batal
            </button>
          </form>
        </div>
      </AlertModal>
    </main>
  );
}
