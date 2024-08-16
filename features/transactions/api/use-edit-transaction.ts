import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions[':id']['$patch']>
type RequestType = InferRequestType<typeof client.api.transactions[':id']['$patch']>['json']

function isErrorResponse(response: any): response is { error: string } {
    return 'error' in response;
}

export const useEditTransaction =(id?: string)=>{
    const queryClient = useQueryClient()
    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json)=>{
            if (!id) {
                throw new Error("Transaction ID is required");
            }

            const response = await client.api.transactions[':id']['$patch']({
                param: { id },
                json,
            })

            if (!response.ok) {
                const errorResponse = await response.json();
                if (isErrorResponse(errorResponse)) {
                  throw new Error(errorResponse.error || 'Failed to update account');
                }
            }

            const successResponse = await response.json();
            return successResponse;
        },
        onSuccess: ()=>{
            toast.success("Transaction updated")
            queryClient.invalidateQueries({queryKey: ['transaction',{id}]})
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['summary'] });
        },
        onError: ()=>{
            toast.error("Failed to edit transaction")
        }
    })
    return mutation
}