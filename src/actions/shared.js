import { _getQuestions, _getUsers } from '../utils/_DATA.js'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'
import { setAuthedUser } from './authedUser'

const AUTHED_ID = ''

export function handleInitialData() {
    
    return (dispatch) => {
        return Promise.all([
            _getQuestions(),
            _getUsers()
        ]).then(([questions, users]) => {
            dispatch(receiveQuestions(questions))
            dispatch(receiveUsers(users))
            if(AUTHED_ID.length > 0 || AUTHED_ID !== '' ) {
                dispatch(setAuthedUser(AUTHED_ID))
            }
        })
    }
    
}