import { getTeams } from "@/api/teams";
import { useQuery } from "@tanstack/react-query";

export interface Teams {
    _id: string,
    name: string
}

export function useTeams() {
    return useQuery<Teams[]>({
        queryKey: ["teams"],
        queryFn: getTeams
    })
}