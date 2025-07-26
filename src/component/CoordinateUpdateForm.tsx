"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TiangService } from "@/service/tiang.service";
import { isoToDateInput } from "@/utils/format-date";
import type { CoordinateUpdateItem } from "@/types/coordinate";

type Props = {
  data: CoordinateUpdateItem;
  onSubmit: (data: CoordinateUpdateItem) => void;
};

export default function CoordinateUpdateForm({ data, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CoordinateUpdateItem>();

  const { data: tiangs = [] } = useQuery({
    queryKey: ["tiangs"],
    queryFn: TiangService.getAll,
  });

  useEffect(() => {
    if (data) {
      reset({
        address: data.address ?? "",
        photoTakenAt: isoToDateInput(data.photoTakenAt),
        tiangId: data.tiangId ?? undefined,
      });
    }
  }, [data, reset]);

  const handleFormSubmit = (formData: CoordinateUpdateItem) => {
    const photoTakenAtIso =
      formData.photoTakenAt.length <= 10
        ? new Date(formData.photoTakenAt).toISOString()
        : formData.photoTakenAt;

    onSubmit({
      ...formData,
      photoTakenAt: photoTakenAtIso,
    });
  };

  return (
    <form
      id="coordinate-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
    >
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
          type="date"
          className="input input-bordered w-full"
          {...register("photoTakenAt", { required: "Tanggal wajib diisi" })}
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
            validate: (value) =>
              !value || !tiangs.some((t) => t.id === value)
                ? "Silakan pilih tiang yang tersedia!"
                : true,
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
        >
          <option value="" disabled>
            Pilih Tiang
          </option>
          {tiangs.map((tiang) => (
            <option key={tiang.id} value={tiang.id}>
              {tiang.name}
            </option>
          ))}
        </select>
        {errors.tiangId && (
          <span className="text-error">{errors.tiangId.message}</span>
        )}
      </div>
    </form>
  );
}
