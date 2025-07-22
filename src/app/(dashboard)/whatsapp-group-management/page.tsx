"use client";

import AlertModal from "@/component/AlertModal";
import Table from "@/component/Table";
import {GroupService} from "@/service/group.service";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import useSWR, {mutate} from "swr";

export default function WhatsappGroupManagementPage() {
    const pathName = usePathname();
    const deleteModalId = "delete-modal";
    const {
        data: groups,
        isLoading,
        error,
    } = useSWR("groups", GroupService.getAll);

    const [targetGroupId, setTargetGroupId] = useState<number | null>(null);

    return (
        <main className="space-y-4">
            <h1 className="underline">Management Whatsapp Group</h1>
            <Link href={`${pathName}/tambah-group`} className={"btn bg-primary"}>Tambah group</Link>
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
                            <td>{group.chatId}</td>
                            <td>
                                <button
                                    className="btn bg-error"
                                    onClick={() => {
                                        setTargetGroupId(group.id);
                                        (
                                            document.getElementById(
                                                deleteModalId
                                            ) as HTMLDialogElement
                                        )?.showModal();
                                    }}
                                >
                                    Hapus
                                </button>
                                {" "}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>

            <AlertModal
                id={deleteModalId}
                label="Konfirmasi Menghapus Group"
                text="Apabila group dihapus whatsapp tidak akan memonitoring link odp lagi apakah anda yakin ingin menghapus?"
            >
                <div className="modal-action">
                    <form method="dialog" className="space-x-2">
                        <button
                            className="btn bg-error"
                            onClick={async (e) => {
                                e.preventDefault();
                                if (!targetGroupId) return;
                                await GroupService.delete(targetGroupId);
                                await mutate("groups");
                                setTargetGroupId(null);
                                (
                                    document.getElementById(deleteModalId) as HTMLDialogElement
                                )?.close();
                            }}
                        >
                            Ya Hapus
                        </button>
                        <button className="btn">Close</button>
                    </form>
                </div>
            </AlertModal>
        </main>
    );
}
