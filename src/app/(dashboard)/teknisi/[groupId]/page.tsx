"use client";

import { use } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GroupService } from "@/service/group.service";
import Table from "@/component/Table";
import Link from "next/link";
import { formatDate } from "@/utils/format-date";
import BackBtn from "@/component/BackBtn";
import ShowImageModal from "@/component/ShowImageModal";
import LoadingState from "@/component/ui/LoadingState";
import ErrorState from "@/component/ui/ErrorState";
import { useShowImageModalStore } from "@/stores/show-image-modal-store";
import { EnvConfig } from "@/config/EnvConfig";

export default function TeknisiDetailPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = use(params);
  const queryClient = useQueryClient();
  const openModal = useShowImageModalStore((state) => state.openModal);

  const {
    data: detail,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["group-coordinates", groupId],
    queryFn: () => GroupService.getGroupCoordinates(Number(groupId)),
    enabled: !!groupId,
  });

  if (isLoading) return <LoadingState message="Memuat detail koordinat..." />;

  if (error)
    return (
      <ErrorState
        message="Gagal memuat data koordinat ODP."
        onRetry={() =>
          queryClient.invalidateQueries({
            queryKey: ["group-coordinates", groupId],
          })
        }
      />
    );

  return (
    <main className="space-y-4">
      <BackBtn />
      <h1>Detail Lokasi ODP</h1>
      <h2>{detail?.name}</h2>

      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Di upload</th>
            <th>Coordinate</th>
            <th>Alamat</th>
            <th>Timemark URL</th>
            <th>Google Maps</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {detail?.coordinates.map((coordinate, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{formatDate(coordinate.photoTakenAt)}</td>
              <td>
                {coordinate.lat}, {coordinate.long}
              </td>
              <td>{coordinate.address ?? "Tidak ada"}</td>
              <td>
                {coordinate.urlId ? (
                  <Link
                    href={`https://timemark.com/s/${coordinate.urlId}/8`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </Link>
                ) : (
                  "Tidak ada"
                )}
              </td>
              <td>
                <Link
                  href={`https://www.google.com/maps?q=${coordinate.lat},${coordinate.long}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-sm bg-primary"
                  onClick={() => openModal(`${EnvConfig.NEXT_PUBLIC_ASSET_BASE_URL}/${detail.name}/${coordinate.imageName}`)}
                >
                  Lihat Gambar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ShowImageModal id="edit-modal" />
    </main>
  );
}
