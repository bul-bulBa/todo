
export type CheckListItem = {
    text: string,
    order?: number,
    completed: boolean
}

export type Todo = {
    id: string,
    text: string,
    complete: boolean,
    deadline?: Date,
    createdAt: Date,
    updatedAt: Date,
    userId: string,
    checkList: CheckListItem[]
}
