'use client';

import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {UpdateCoordinateInput} from "@/types/request";
import {mutate} from "swr";
import Image from "next/image";
import Link from "next/link";
import {WhatsappCoordinateService} from "@/services/whatsapp.service";
import {isValidURL} from "@/utils/is-valid-url";

interface Props {
    coordinateId: number;
    defaultAddress?: string;
    modalId: string;
    photoTakenAt: string;
    imageUrl: string;
}

export default function UpdateCoordinateModal({coordinateId, defaultAddress, modalId, photoTakenAt, imageUrl}: Props) {
    const {register, handleSubmit, control, formState: {errors}} = useForm<UpdateCoordinateInput>({
        defaultValues: {
            address: defaultAddress ?? "",
            photoTakenAt: photoTakenAt?.split("T")[0] ?? ""
        },
    });

    const onSubmitHandler: SubmitHandler<UpdateCoordinateInput> = async (data) => {
        const payload = {
            ...data,
            photoTakenAt: data.photoTakenAt ? new Date(data.photoTakenAt).toISOString() : undefined
        };

        if (!data.url || data.url.trim() === "") {
            delete payload.url;
        }

        await WhatsappCoordinateService().update(coordinateId, payload);
        await mutate("whatsapp-coordinate-group");

        const dialog = document.getElementById(modalId) as HTMLDialogElement;
        dialog?.close();
    };

    return (
        <dialog id={`${modalId}_edit`} className="modal">
            <div className="modal-box w-full max-w-2xl p-4 sm:p-6">
                <Link href={imageUrl} target="_blank">
                    <Image
                        width={400}
                        height={400}
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-auto object-contain rounded mb-4"
                    />
                </Link>
                <h3 className="font-bold text-lg mb-4">Edit Alamat</h3>

                <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
                    {/* Date Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tanggal</span>
                        </label>

                        <Controller
                            name="photoTakenAt"
                            control={control}
                            render={({field}) => (
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    {...field}
                                />
                            )}
                        />

                    </div>

                    <div className="fo rm-control">
                        <label className="label">
                            <span className="label-text">Alamat</span>
                        </label>
                        <textarea
                            {...register("address", {required: true})}
                            className="textarea textarea-bordered w-full"
                        />
                        {errors.address && (
                            <span className="text-error text-sm mt-1">Alamat wajib diisi</span>
                        )}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">URL Timemark</span>
                        </label>
                        <input
                            {...register("url", {
                                validate: (value) =>
                                    !value || isValidURL(value) || "URL tidak valid",
                            })}
                            placeholder="Contoh: https://timemark.id/view/abc123"
                            className="input input-bordered w-full"
                        />
                        {errors.url && (
                            <span className="text-error text-sm mt-1">Url tidak bisa ditemukan</span>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary">Simpan</button>
                    </div>
                </form>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
