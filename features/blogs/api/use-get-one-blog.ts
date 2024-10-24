import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/hono"
import { number } from "zod"

export const useGetBlog = (id?: any) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["blog", { id }],
        queryFn: async () => {
            const response = await client.api.blogs[":id"].$get({
                param: { id },
            })

            if(!response.ok){
                throw new Error("Failed to fetch blog")
            }

            const { data } = await response.json()
            return data
        },
    })

    return query
}