import * as React from 'react'
import { Html, Body, Heading, Text, Link, Tailwind } from '@react-email/components'

type Props = {
    domain: string, token: string
}

export function ConfirmationTemplate( {domain, token}: Props ) {
    const confirmLink = `${domain}/new-verification?token=${token}`

     return (
        <Tailwind>
            <Html>
                <Body>
                    <Heading>Email confirmation</Heading>
                    <Text>
                        Hello! To confirm your email address,
                        please follow this link:
                    </Text>
                    <Link href={confirmLink}>Confirm Email</Link>
                    <Text>
                        This link is valid for 1 hour. If you was't request confirmation,
                        just ignore this message
                    </Text>
                    <Text>Thank's for using our service!</Text>
                </Body>
            </Html>
        </ Tailwind>
    )
}