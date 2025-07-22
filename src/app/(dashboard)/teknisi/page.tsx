"use client";
import useSWR from "swr";
import { GroupService } from "@/service/group.service";

export default function TeknisiPage() {
  const {
    data: groupsSummary,
    error,
    isLoading,
  } = useSWR("group-get-all", GroupService.getSummary);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      Herllo World
      {groupsSummary?.map((group, index) => (
        <div key={index}>{group.name}</div>
      ))}
    </div>
  );
}
