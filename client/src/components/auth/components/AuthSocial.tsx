import { useOAuthMutation } from "../hooks/useOAuthMutation"
import { Button } from "@/components/ui/button"
import { FaGoogle } from 'react-icons/fa'

const AuthSocial = () => {
    const mutate = useOAuthMutation()

    return (
        <div>
            <div>
                <Button variant='outline' onClick={() => mutate('google')}>
                    <FaGoogle className="mr-2 size-4" />
                    Google
                </Button>
            </div>
            <div className="relative mb-2 flex items-center">
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t" />

                <span className="relative mx-auto bg-background px-2 text-xs uppercase text-muted-foreground">
                    Or
                </span>
            </div>
        </div>
    )
}

export default AuthSocial