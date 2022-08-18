import {todolistAPI} from '../../api/todolist-api';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {appActions} from '../CommonActions/AppActions';
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {asyncActions as asyncTodolistsActions} from './todolists-reducer';
import {AppRootStateType, ThunkError} from '../../utils/types';
import {TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../../api/types';

const initialState: TasksStateType = {}

export const fetchTasks = createAsyncThunk<{ todolistId: string, tasks: TaskType[] }, string, ThunkError>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTasks(todolistId);
        const tasks = res.data.items
        thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {todolistId, tasks};
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(thunkAPI, error, false)
    }
})
export const removeTask = createAsyncThunk<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }, ThunkError>('tasks/removeTask', async (param, {dispatch}) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    await todolistAPI.deleteTask(param.todolistId, param.taskId)
    dispatch(appActions.setAppStatus({status: 'succeeded'}))
    return {todolistId: param.todolistId, taskId: param.taskId}
})
export const addTask = createAsyncThunk<TaskType, { todolistId: string, title: string }, ThunkError>('tasks/addTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    const res = await todolistAPI.createTask(param.todolistId, param.title);
    try {
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return task
        } else {
            handleAsyncServerAppError(thunkAPI, res.data, false)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(thunkAPI, error, false)
    }
})
export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { todolistId: string, taskId: string, model: UpdateDomainTaskModelType }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType
    const allAppTasks = state.tasks
    const tasksForCurrentTodolist = allAppTasks[param.todolistId]
    const changedTask = tasksForCurrentTodolist.find((t) => {
        return t.id === param.taskId
    })
    if (!changedTask) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }

    const apiModel: UpdateTaskModelType = {
        title: changedTask.title,
        description: changedTask.description,
        status: changedTask.status,
        priority: changedTask.priority,
        startDate: changedTask.startDate,
        deadline: changedTask.deadline,
        ...param.model
    }
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    const res = await todolistAPI.updateTask(param.todolistId, param.taskId, apiModel);
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return param
        } else {
            return handleAsyncServerAppError(thunkAPI, res.data)
        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(thunkAPI, error)
    }
})

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask
}

export const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncTodolistsActions.addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(asyncTodolistsActions.removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(asyncTodolistsActions.fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            })
    }
})

// types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

