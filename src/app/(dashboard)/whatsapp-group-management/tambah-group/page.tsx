"use client";

import Table from "@/component/Table";
import {GroupService} from "@/service/group.service";
import useSWR, {mutate} from "swr";
import AlertModal from "@/component/AlertModal";
import {useState} from "react";
import BackBtn from "@/component/BackBtn";

export default function TambahGroupPage() {
    const tambahModalId = "tambah-modal"
    const {
        data: groups,
        isLoading,
        error,
    } = useSWR("group-chats", GroupService.whatsappGroupChats);
    const [targetChatId, setTargetChatId] = useState<string | null>(null)
    return (
        <main className="space-y-4">
            <BackBtn/>
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
                                <button className="btn bg-primary btn-sm" onClick={() => {
                                    setTargetChatId(group.id);
                                    (
                                        document.getElementById(
                                            tambahModalId
                                        ) as HTMLDialogElement
                                    )?.showModal();
                                }}>Tambah
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
                text="Apabila group ditambah maka setiap chat yang mengandung url Timemark akan masuk ke database, apakah anda yakin?"
            >
                <div className="modal-action">
                    <form method="dialog" className="space-x-2">
                        <button
                            className="btn bg-primary"
                            onClick={async (e) => {
                                e.preventDefault();
                                if (!targetChatId) return;
                                await GroupService.create(targetChatId);
                                await mutate("group-chats");
                                setTargetChatId(null);
                                (document.getElementById(tambahModalId) as HTMLDialogElement
                                )?.close();
                            }}
                        >
                            Ya Yakin
                        </button>
                        <button className="btn">Close</button>
                    </form>
                </div>
            </AlertModal>
        </main>
    );
}
