import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
            
import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.blogs[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.blogs[":id"]["$patch"]>["json"];

export const useEditBlogs = (id?: any) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.blogs[":id"]["$patch"]({ 
                param: { id },
                json, 
            })
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Blogs updated")
            queryClient.invalidateQueries({ queryKey:  ["blogs", { id }] })
            queryClient.invalidateQueries({ queryKey:  ["blogs"] })
            //TODO: Invalidate sumary and transactions
        },
        onError: () => {
            toast.error("Failed to edit Blogs")
        },
    })

    return mutation
}