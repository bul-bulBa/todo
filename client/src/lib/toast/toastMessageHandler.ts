import { toast } from "sonner"

export const toastMessageHandler = (error: any) => {
    console.log(error)
    if(error.response?.data?.message) {
        const errorMessage = error.response?.data?.message
        
        toast.error(errorMessage)
    } else toast.error(error)
}