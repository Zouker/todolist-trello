import axios, {AxiosResponse} from 'axios'
import {
    AuthMeType,
    BaseResponseType,
    LoginParamsType,
    ResponseTasksType,
    TaskType,
    TodolistType,
    UpdateTaskModelType
} from './types';

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    withCredentials: true,
    headers: {
        'API-KEY': 'ee7769c8-821f-475b-be91-ea9e1f4fc86c'
    }
})

// api
export const todolistAPI = {
    getTodolists: () => {
        return instance.get<Array<TodolistType>>(`/todo-lists`)
    },
    createTodolist: (title: string) => {
        return instance.post<'', AxiosResponse<BaseResponseType<{ item: TodolistType }>>, { title: string }>(`/todo-lists`, {title})
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist: (todolistId: string, title: string) => {
        return instance.put<'', AxiosResponse<BaseResponseType>>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks: (todolistId: string) => {
        return instance.get<ResponseTasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<'', AxiosResponse<BaseResponseType<{ item: TaskType }>>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask: (todolistId: string, taskId: string, model: UpdateTaskModelType) => {
        return instance.put<UpdateTaskModelType, AxiosResponse<BaseResponseType<{ item: TaskType }>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<BaseResponseType<{ userId: string }>>>('/auth/login', data)
    },
    logout() {
        return instance.delete<LoginParamsType, AxiosResponse<BaseResponseType<{ userId: string }>>>('/auth/login')
    },
    me() {
        return instance.get<BaseResponseType<AuthMeType>>('/auth/me')
    }
}