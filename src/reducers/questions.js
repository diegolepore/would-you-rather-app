import { RECEIVE_QUESTIONS,TOGGLE_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions,
            }
        case TOGGLE_QUESTION :
            return {
                ...state,
                [action.qid]: {
                        ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }
        case ADD_QUESTION :
            return {
                ...state,
                [action.question.id]: {
                    author: action.question.author,
                    id: action.question.id,
                    optionOne : { votes: [], text: action.question.optionOne.text},
                    optionTwo : { votes: [], text: action.question.optionTwo.text},
                    timestamp: action.question.timestamp
                    
                }
                  
            }
        default :
            return state
    }
}