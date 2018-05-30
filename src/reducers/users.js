import { RECEIVE_USERS } from '../actions/users'
import { TOGGLE_QUESTION_USER } from '../actions/users'
import { ADD_QUESTION_USER } from '../actions/users'

export default function users(state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case TOGGLE_QUESTION_USER :
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                      ...state[action.authedUser].answers,
                      [action.qid]: action.answer
                    }
                  }
            }

        case ADD_QUESTION_USER :
            return {
                ...state,
                [action.user.id]: {
                    ...action.user,
                    questions: action.user.questions.concat([action.question.id])
                }
            }

        default :
            return state
    }
}