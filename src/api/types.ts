// types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FieldErrorType = { field: string, error: string }
export type BaseResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldErrorType>
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type ResponseTasksType = {
    items: Array<TaskType>
    error: string | null
    totalCount: number
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export type AuthMeType = {
    id: number
    email: string
    login: string
}