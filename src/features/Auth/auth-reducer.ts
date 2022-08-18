import {authAPI} from '../../api/todolist-api';
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FieldErrorType, LoginParamsType} from '../../api/types';
import {appActions} from '../CommonActions/AppActions';

const {setAppStatus} = appActions

export const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(thunkAPI, res.data)
        }
    } catch (err) {
        const error = err as AxiosError;
        return handleAsyncServerNetworkError(thunkAPI, error);
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await authAPI.logout();
    try {

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return;
        } else {
            return handleAsyncServerAppError(thunkAPI, res.data)
        }
    } catch (err) {
        const error = err as AxiosError
        return handleAsyncServerNetworkError(thunkAPI, error)
    }
})

export const asyncActions = {
    login,
    logout
}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false
            })
    }
})

export const authReducer = slice.reducer;


