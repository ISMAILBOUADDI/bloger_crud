import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.blogs[":id"]["$delete"]>

export const useDeleteBlog = (id?: any) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async (json) => {
            const response = await client.api.blogs[":id"]["$delete"]({ 
                param: { id },
            })
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Blog deleted")
            queryClient.invalidateQueries({ queryKey:  ["blogs", { id }] })
            queryClient.invalidateQueries({ queryKey:  ["blogs"] })
            //TODO: Invalidate sumary and transactions
        },
        onError: () => {
            toast.error("Failed to delete Blog")
        },
    })

    return mutation
}