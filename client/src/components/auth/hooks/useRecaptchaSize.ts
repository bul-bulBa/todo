import { useWindowSize } from "@uidotdev/usehooks"


export const useRecaptchaSize = () => {
    const { width } = useWindowSize()
    
    if(!width) return 'normal'
    if (width < 400) return 'compact'

    return 'normal'
}