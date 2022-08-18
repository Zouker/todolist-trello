import * as appSelectors from '../../app/selectors'
import {asyncActions, RequestStatusType as T1, slice} from './application-reducer'

const appReducer = slice.reducer
const actions = slice.actions

const appActions = {
    ...actions,
    ...asyncActions,
}
export type RequestStatusType = T1

export {
    appSelectors,
    appReducer,
    appActions,
}