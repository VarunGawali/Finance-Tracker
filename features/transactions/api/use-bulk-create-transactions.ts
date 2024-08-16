import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>['json']

export const useBulkCreateTransactions =()=>{
    const queryClient = useQueryClient()

    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json) => {
            try {
                const response = await client.api.transactions["bulk-create"]["$post"]({ json });
                if (!response.ok) {
                    const errorDetails = await response.json();
                    console.error("Error response from server:", errorDetails);
                    throw new Error(`Server error: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error("Error making API request:", error);
                throw error;
            }
        },
        onSuccess: ()=>{
            toast.success("Transaction created")
            queryClient.invalidateQueries({queryKey: ['transactions']})
            queryClient.invalidateQueries({ queryKey: ['summary'] });
        },
        onError: ()=>{
            toast.error("Failed to create transaction")
        }
    })
    return mutation
}