'use client';

import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {UpdateCoordinateInput} from "@/types/request";
import {mutate} from "swr";

interface Props {
    coordinateId: number;
    defaultAddress?: string;
    modalId: string;
    createdAt: string;
}

export default function EditModal({coordinateId, defaultAddress, modalId, createdAt}: Props) {
    const {register, handleSubmit, control, formState: {errors}} = useForm<UpdateCoordinateInput>({
        defaultValues: {
            address: defaultAddress ?? "",
            createdAt: createdAt?.split("T")[0] ?? ""
        },
    });

    const onSubmitHandler: SubmitHandler<UpdateCoordinateInput> = async (data) => {
        console.log("Submitted data:", data);
        // await WhatsappCoordinateService().update(coordinateId, data);
        await mutate("whatsapp-coordinate-group");
        const dialog = document.getElementById(modalId) as HTMLDialogElement;
        dialog?.close();
    };

    return (
        <dialog id={modalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Edit Alamat</h3>
                <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">

                    {/* Calendar dari DaisyUI */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Tanggal</span>
                        </label>

                        <Controller
                            name="createdAt"
                            control={control}
                            render={({field}) => (
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                    value={field.value}
                                    onChange={(e) =>
                                        field.onChange(new Date(e.target.value))
                                    }
                                />
                            )}
                        />
                    </div>

                    {/* Address */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Alamat</span>
                        </label>
                        <input
                            {...register("address", {required: true})}
                            className="input input-bordered w-full"
                        />
                        {errors.address && (
                            <span className="text-error text-sm mt-1">Alamat wajib diisi</span>
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
