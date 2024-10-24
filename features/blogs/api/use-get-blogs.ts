import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/hono"

export const useGetBlogs = () => {
    const query = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const response = await client.api.blogs.$get()

            if(!response.ok){
                throw new Error("Failed to fetch blogs")
            }

            const { data } = await response.json()
            return data
        },
    })

    return query
}