import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@tanstack/react-router"
import { SettingsSchema, type TypeSettingsSchema } from "../shemas/settings.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useIsAuth } from "@/clientStore/isAuth"
import EditAccount from "./EditAccount"


const SettingsPage = () => {

    return (
        <div>
            <Card className="w-[80vw] sm:w-[400px]">
                <CardHeader className='space-y-2'>
                    <CardTitle>Settings</CardTitle>
                </CardHeader>

                <CardContent>
                    <EditAccount />
                </CardContent>

                <CardFooter>
                    <Button variant='destructive' className="w-full font-normal">
                        Delete Account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SettingsPage