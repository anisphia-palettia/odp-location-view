import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {CoordinateItem} from "@/types/coordinate";
import {formatDate, isoToDateInput} from "@/utils/format-date";
import Image from "next/image";
import {EnvConfig} from "@/config/EnvConfig";

type Props = {
    id: string;
    data: CoordinateItem | null;
    groupName?: string;
    onSave?: (data: CoordinateItem) => void;
};

export default function EditCoordinateModal({id, data, onSave, groupName}: Props) {
    const [isEdit, setIsEdit] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<CoordinateItem>();

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                photoTakenAt: isoToDateInput(data.photoTakenAt),
            });
        }
        setIsEdit(false);
    }, [data, reset]);

    function onSubmit(formData: CoordinateItem) {
        if (onSave) {
            onSave({
                ...data,
                ...formData,
                // Pastikan tanggalnya ISO string (opsional, jika server perlu ISO)
                photoTakenAt: formData.photoTakenAt.length <= 10
                    ? new Date(formData.photoTakenAt).toISOString()
                    : formData.photoTakenAt
            } as CoordinateItem);
        }
        setIsEdit(false);
        (document.getElementById(id) as HTMLDialogElement)?.close();
    }

    if (!data) return null;

    return (
        <dialog id={id} className="modal">
            <div className="modal-box w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
                <h2 className="font-bold text-xl mb-6">
                    {isEdit ? "Edit Coordinate" : "Detail Coordinate"}
                </h2>
                {isEdit ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="label">Latitude</label>
                                <input
                                    className="input input-bordered w-full"
                                    {...register("lat", {required: "Latitude wajib diisi"})}
                                />
                                {errors.lat && (
                                    <span className="text-error">{errors.lat.message}</span>
                                )}
                            </div>
                            <div>
                                <label className="label">Longitude</label>
                                <input
                                    className="input input-bordered w-full"
                                    {...register("long", {required: "Longitude wajib diisi"})}
                                />
                                {errors.long && (
                                    <span className="text-error">{errors.long.message}</span>
                                )}
                            </div>
                        </div>
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
                        <div className="modal-action mt-6 flex gap-2">
                            <button type="submit" className="btn btn-primary">
                                Simpan
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => setIsEdit(false)}
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                        {/* Gambar */}
                        {data.imageName && groupName && (
                            <div className="w-full md:w-[220px] flex justify-center">
                                <div className="w-[220px] aspect-[220/320] relative rounded-lg overflow-hidden shadow bg-base-200">
                                    <Image
                                        src={`${EnvConfig.NEXT_PUBLIC_ASSET_BASE_URL}/${groupName}/${data.imageName}`}
                                        alt={data.imageName}
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>
                            </div>
                        )}

                        {/* Detail */}
                        <div className="flex-1 flex flex-col gap-2">
                            <div>
                                <span className="font-bold">Tanggal Foto Diambil: </span>
                                {formatDate(data.photoTakenAt)}
                            </div>
                            <div>
                                <span className="font-bold">Koordinat: </span>
                                {data.lat}, {data.long}
                            </div>
                            <div>
                                <span className="font-bold">Alamat: </span>
                                {data.address}
                            </div>
                            <div className="flex gap-2 mt-6">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setIsEdit(true)}
                                >
                                    Edit
                                </button>
                                <form method="dialog">
                                    <button className="btn btn-neutral" type="submit">
                                        Tutup
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </dialog>
    );
}
