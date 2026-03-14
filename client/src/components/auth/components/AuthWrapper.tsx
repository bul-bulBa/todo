import { Link } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import type { PropsWithChildren } from "react"
import AuthSocial from "./AuthSocial"

type AuthWrapperProps = {
    heading: string,
    description?: string,
    backButtonLabel?: string,
    backButtonHref?: string,
    isShowSocial?: boolean
}

const AuthWrapper = ({
    children,
    heading,
    description,
    backButtonLabel,
    backButtonHref,
    isShowSocial = true
}: PropsWithChildren<AuthWrapperProps>) => {

    return (
         <Card className="w-[400px]">
            <CardHeader className='space-y-2'>
                <CardTitle>{heading}</CardTitle>
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
            </CardHeader>

            <CardContent>
                {isShowSocial && <AuthSocial />}
                {children}
            </CardContent>

            <CardFooter>
                {backButtonLabel && backButtonHref && (
                    <Button variant='link' className="w-full font-normal">
                        <Link to={backButtonHref}>{backButtonLabel}</Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

export default AuthWrapper