import {useForm} from "react-hook-form";
import {useEffect, useRef} from "react";
import Image from "next/image";
import {isoToDateInput} from "@/utils/format-date";
import {EnvConfig} from "@/config/EnvConfig";
import type {CoordinateItem, CoordinateUpdateItem} from "@/types/coordinate";
import useSWR from "swr";
import {TiangService} from "@/service/tiang.service";

type Props = {
    id: string;
    data: CoordinateItem | null;
    groupName?: string;
    onSave?: (data: CoordinateUpdateItem) => void;
    onClose: () => void;
};

export default function VerificationAndEdit({
                                                id, data, groupName, onSave, onClose
                                            }: Props) {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<CoordinateUpdateItem>();
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const {data: tiangs} = useSWR("tiangs", TiangService.getAll);

    useEffect(() => {
        if (!data) return;
        reset({
            ...data,
            photoTakenAt: isoToDateInput(data.photoTakenAt),
            tiangId: data.tiang?.id,
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

    const onSubmit = (formData: CoordinateUpdateItem) => {

        const photoTakenAtIso =
            formData.photoTakenAt && formData.photoTakenAt.length <= 10
                ? new Date(formData.photoTakenAt).toISOString()
                : formData.photoTakenAt;

        const payload = {
            photoTakenAt: photoTakenAtIso,
            address: formData.address,
            tiangId: formData.tiangId,
        } as CoordinateUpdateItem;

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
                            {...register("photoTakenAt", {required: "Tanggal wajib diisi"})}
                        />
                        {errors.photoTakenAt && (
                            <span className="text-error">{errors.photoTakenAt.message}</span>
                        )}
                    </div>
                    <div>
                        <label className="label">Tiang</label>
                        <select
                            className="select select-bordered w-full"
                            {...register("tiangId", {
                                required: "Tiang wajib dipilih",
                                validate: (value) => {
                                    if (
                                        !value ||
                                        !tiangs?.some((t) => t.id === value)
                                    ) {
                                        return "Silakan pilih tiang yang tersedia!";
                                    }
                                    return true;
                                },

                                setValueAs: (v) => (v === "" ? undefined : Number(v)),
                            })}
                            defaultValue={data?.tiang?.id ?? ""}
                        >
                            <option value="" disabled>
                                Pilih Tiang
                            </option>
                            {tiangs?.map((tiang) => (
                                <option key={tiang.id} value={tiang.id}>
                                    {tiang.name}
                                </option>
                            ))}
                        </select>
                        {errors.tiangId && (
                            <span className="text-error">{errors.tiangId.message}</span>
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
