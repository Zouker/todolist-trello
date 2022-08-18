import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {rootReducer} from '../app/store';
import {FieldErrorType} from '../api/types';

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<RootReducerType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }