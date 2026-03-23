import { useForm } from "react-hook-form"
import { SettingsSchema, type TypeSettingsSchema } from "../shemas/settings.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useIsAuth } from "@/clientStore/isAuth"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useChangeAccount } from "../hooks/useChageAccount"
import { Button } from "@/components/ui/button"


const EditAccount = () => {

    const form = useForm<TypeSettingsSchema>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: useIsAuth.getState().user
    })

    const { change, isLoadingChanging } = useChangeAccount()

    const onSubmit = (values: TypeSettingsSchema) => {
        change(values)
    }

    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            disabled={isLoadingChanging}
                            {...form.register('email')}
                            placeholder="example@gmail.com" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="isTwoFactorEnabled">
                            Two factor
                        </FieldLabel>
                        <Switch
                            disabled={isLoadingChanging}
                            {...form.register('isTwoFactorEnabled')} />
                    </Field>

                    <Button type='submit' variant='secondary'>
                        Submit
                    </Button>
                </FieldGroup>

            </ form>
        </div>
    )
}

export default EditAccount