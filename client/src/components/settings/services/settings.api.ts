import { api } from "@/lib/axios.config"
import type { TypeSettingsSchema } from "../shemas/settings.schema"


class SettingsApi {
    update = (data: TypeSettingsSchema) => 
        api.put('/user', data).then(res => res.data) 

}

export const settingsApi = new SettingsApi