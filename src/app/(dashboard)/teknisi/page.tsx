"use client"
import useSWR from "swr";
import {GroupService} from "@/service/group.service";

export default function TeknisiPage() {
    const {data: groups, error, mutate, isLoading} = useSWR('group-get-all', GroupService.getAll);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {groups?.map((group, index) => (
                <div key={index}>{group.name}</div>
            ))}
        </div>
    );
}