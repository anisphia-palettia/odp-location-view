import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { isoToDateInput } from "@/utils/format-date";
import { EnvConfig } from "@/config/EnvConfig";
import type { CoordinateItem } from "@/types/coordinate";

type Props = {
    id: string;
    data: CoordinateItem | null;
    groupName?: string;
    onSave?: (data: CoordinateItem) => void;
    onClose: () => void;
};

export default function VerificationAndEdit({
                                                id, data, groupName, onSave, onClose
                                            }: Props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CoordinateItem>();
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (!data) return;
        reset({
            ...data,
            photoTakenAt: isoToDateInput(data.photoTakenAt),
        });
        dialogRef.current?.showModal();
    }, [data, reset]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const handler = () => onClose();
        dialog.addEventListener("close", handler);
        return () => dialog.removeEventListener("close", handler);
    }, [onClose]);

    const onSubmit = (formData: CoordinateItem) => {
        const photoTakenAtIso =
            formData.photoTakenAt && formData.photoTakenAt.length <= 10
                ? new Date(formData.photoTakenAt).toISOString()
                : formData.photoTakenAt;

        const payload = {
            ...formData,
            photoTakenAt: photoTakenAtIso,
        } as CoordinateItem;

        console.log(payload);

        onSave?.(payload);
        dialogRef.current?.close();
    };


    return (
        <dialog id={id} className="modal" ref={dialogRef}>
            <div className="modal-box">
                <h2 className="mb-6">Verifikasi dan Edit</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {data && (
                        <Image
                            src={`${EnvConfig.NEXT_PUBLIC_ASSET_BASE_URL}/${groupName}/${data.imageName}`}
                            alt="Image"
                            unoptimized
                            width={400}
                            height={400}
                            className="w-full"
                        />
                    )}
                    <div>
                        <label className="label">Alamat</label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            {...register("address")}
                        />
                    </div>
                    <div>
                        <label className="label">Tanggal Foto Diambil</label>
                        <input
                            className="input input-bordered w-full"
                            type="date"
                            {...register("photoTakenAt", { required: "Tanggal wajib diisi" })}
                        />
                        {errors.photoTakenAt && (
                            <span className="text-error">{errors.photoTakenAt.message}</span>
                        )}
                    </div>
                    <div className="modal-action mt-6 flex gap-2">
                        <button type="submit" className="btn btn-primary">
                            Simpan
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => dialogRef.current?.close()}
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
