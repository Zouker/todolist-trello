import {appActions} from '../features/CommonActions/AppActions';
import {AxiosError} from 'axios';
import {BaseResponseType} from '../api/types';

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export const handleAsyncServerAppError = <T>(thunkAPI: ThunkAPIType, data: BaseResponseType<T>, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some occurred error'}))
    }
    thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = (thunkAPI: ThunkAPIType, error: AxiosError, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appActions.setAppError({error: error.message ? error.message : 'Some occurred error'}))
    }
    thunkAPI.dispatch(appActions.setAppStatus({status: 'failed'}))

    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}