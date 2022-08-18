import {ThunkDispatch} from 'redux-thunk';
import {ActionCreatorsMapObject, AnyAction, bindActionCreators} from 'redux';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useMemo} from 'react';
import {AppRootStateType} from './types';

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}