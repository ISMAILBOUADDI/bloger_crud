import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.blogs.$post>
type RequestType = InferRequestType<typeof client.api.blogs.$post>["json"];

export const useCreateBlog = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            // console.log("jsonnnn",json);
            const response = await client.api.blogs.$post({ json })
            // console.log("resssss",response);
            
            return await response.json()
        },
        onSuccess: () => {
            toast.success("blogs created")
            queryClient.invalidateQueries({ queryKey:  ["blogs"] })
        },
        onError: () => {
            toast.error("Failed to create blogs")
        },
    })

    return mutation
}