import {createAction} from '@reduxjs/toolkit';
import {RequestStatusType} from '../Application';

const setAppStatus = createAction<{ status: RequestStatusType }>('common/setAppStatus')
const setAppError = createAction<{ error: string | null }>('common/setAppError')

export const appActions = {
    setAppStatus,
    setAppError
}