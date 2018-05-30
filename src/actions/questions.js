import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'


function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion (question) {
    return (dispatch, getState) => {
        const {optionOneText, optionTwoText, author} = question
        return _saveQuestion({optionOneText, optionTwoText, author})
        .then((question) => dispatch(addQuestion(question)))
    }
}

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function toggleQuestion({ authedUser, qid, answer }) {
    return {
        type: TOGGLE_QUESTION,
        authedUser,
        qid,
        answer,
    }
}

export function handleToggleQuestion(info) {
    return (dispatch) => {
        dispatch(toggleQuestion(info))

        return _saveQuestionAnswer(info)
            .catch((e)=>{
                console.warn('Error in handleToggleQuestion:', e)
                dispatch(toggleQuestion(info))
                alert('There was an error voting the question. Try again.')
            })
    }
}

