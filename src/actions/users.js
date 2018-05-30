import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const TOGGLE_QUESTION_USER = 'TOGGLE_QUESTION_USER'
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER'

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

function toggleQuestionUser({ authedUser, qid, answer }) {
    return {
        type: TOGGLE_QUESTION_USER,
        authedUser,
        qid,
        answer,
    }
}

export function handleToggleQuestionUser(info) {
    return (dispatch) => {
        dispatch(toggleQuestionUser(info))

        return _saveQuestionAnswer(info)
            .catch((e)=>{
                console.warn('Error in handleToggleQuestionUser:', e)
                dispatch(toggleQuestionUser(info))
                alert('There was an error voting the question. Try again.')
            })
    }
}

function addQuestionUser (question, users) {
    return {
        type: ADD_QUESTION_USER,
        question,
        user: users[question.author]
    }
}

export function handleAddQuestionUser (question) {
    return (dispatch, getState) => {
        const { users } = getState()
        const {optionOneText, optionTwoText, author} = question
        return _saveQuestion({optionOneText, optionTwoText, author, users})
        .then((question) => {
            console.log('QUESTION', question, users)
            dispatch(addQuestionUser(question, users))
        })
    }
}

