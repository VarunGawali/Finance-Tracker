import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories[':id']['$patch']>
type RequestType = InferRequestType<typeof client.api.categories[':id']['$patch']>['json']

function isErrorResponse(response: any): response is { error: string } {
    return 'error' in response;
}

export const useEditCategory =(id?: string)=>{
    const queryClient = useQueryClient()
    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json)=>{
            if (!id) {
                throw new Error("ID is required");
            }

            const response = await client.api.categories[':id']['$patch']({
                param: { id },
                json,
            })

            if (!response.ok) {
                const errorResponse = await response.json();
                if (isErrorResponse(errorResponse)) {
                  throw new Error(errorResponse.error || 'Failed to update category');
                }
            }

            const successResponse = await response.json();
            return successResponse;
        },
        onSuccess: ()=>{
            toast.success("Category updated")
            queryClient.invalidateQueries({queryKey: ['category',{id}]})
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
        onError: ()=>{
            toast.error("Failed to edit category")
        }
    })
    return mutation
}