"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { GroupService } from "@/service/group.service";
import BackBtn from "@/component/BackBtn";
import Table from "@/component/Table";
import type { CoordinateUpdateItem } from "@/types/coordinate";
import { formatDate } from "@/utils/format-date";
import Link from "next/link";
import { useVerificationAndEditModalStore } from "@/stores/verification-and-edit-modal-store";
import { EnvConfig } from "@/config/EnvConfig";
import VerificationModal from "@/component/VerificationModal";
import LoadingState from "@/component/ui/LoadingState";
import ErrorState from "@/component/ui/ErrorState";

export default function VerifikasiODPPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = use(params);
  const openModal = useVerificationAndEditModalStore(
    (state) => state.openModal
  );

  const {
    data: detail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["group-coordinates", groupId],
    queryFn: () => GroupService.getGroupCoordinates(Number(groupId), false),
    enabled: !!groupId,
  });

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <main className="space-y-4">
      <BackBtn />
      <h1>Verifikasi ODP</h1>
      <h2>{detail?.name}</h2>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tanggal</th>
            <th>Koordinat</th>
            <th>Alamat</th>
            <th>Link Maps</th>
            <th>Link Timemark</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {detail?.coordinates?.map((coordinate, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{formatDate(coordinate.photoTakenAt)}</td>
              <td>
                {coordinate.lat}, {coordinate.long}
              </td>
              <td>{coordinate.address || "Tidak ada"}</td>
              <td>
                <Link
                  href={`https://www.google.com/maps?q=${coordinate.lat},${coordinate.long}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Link
                </Link>
              </td>
              <td>
                {coordinate.urlId ? (
                  <Link
                    href={`https://timemark.com/s/${coordinate.urlId}/8`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Link
                  </Link>
                ) : (
                  "Tidak ada"
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    const data: CoordinateUpdateItem = {
                      address: coordinate.address,
                      photoTakenAt: coordinate.photoTakenAt,
                      tiangId: coordinate.tiangId,
                    };
                    openModal(
                      `${EnvConfig.NEXT_PUBLIC_ASSET_BASE_URL}/${detail.name}/${coordinate.imageName}`,
                      data
                    );
                  }}
                >
                  Verifikasi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <VerificationModal id="verifikasi-modal" />
    </main>
  );
}
