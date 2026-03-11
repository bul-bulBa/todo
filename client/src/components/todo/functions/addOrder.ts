import type { CheckListItem } from "../types/todoType"


export const addOrder = (checkList: CheckListItem[]) => {
    const res = checkList?.map(((item, index) => ({
        ...item, order: index
    }))) ?? undefined
    
    return res
}