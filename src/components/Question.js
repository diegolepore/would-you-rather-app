import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { handleToggleQuestion } from '../actions/questions'
import { handleToggleQuestionUser } from '../actions/users'


class Question extends Component {

    alreadyAnswered = () => {
        const { authedUser } = this.props
        if(!(this.props.question.optionOne.votes.includes(authedUser) || this.props.question.optionTwo.votes.includes(authedUser))) {
            return false
        }else {
            return true
        }
    }

    handleVote = (answer) => {
        const { id } = this.props.question 
        const { dispatch, authedUser } = this.props
        if(!(this.props.question.optionOne.votes.includes(authedUser) || this.props.question.optionTwo.votes.includes(authedUser))) {
            dispatch(handleToggleQuestion({
                authedUser,
                qid: id,
                answer: answer,
            }))
            dispatch(handleToggleQuestionUser({
                authedUser,
                qid: id,
                answer: answer,
            }))

        }
    }

    render() {
        const {id, avatarURL, name, timestamp, optionOne, optionTwo, answers } = this.props.data
        const { authedUser, users } = this.props
        return (
            <div>
        {console.log('QUES: ', users[authedUser].answers[this.props.question.id] )}
                    <div className='top-info'>
                        <div className='avatarImg' style={{background:`url(/${avatarURL}) no-repeat center center`}}></div>
                        <p className='user-name'>{name}</p>
                        <div className='question-date'>{moment(timestamp).format('L')}</div>
                    </div>
                
                <div className='questions-container'>
                    <div className='option-1'>
                        <strong>Option 1</strong>                    
                        <p>
                            {optionOne.text}
                        </p>
                        {this.props.isQuestion && (
                            <div className={((Object.keys(answers).includes(this.props.question.id)) && users[authedUser].answers[this.props.question.id] === 'optionOne' ) ? 'active-option' : '' }>

                                {( (Object.keys(answers).includes(this.props.question.id) && (users[authedUser].answers[this.props.question.id])) && (
                                    <p className='percentage'>{`This percentage of users voted for this one: ${((optionOne.votes.length / Object.keys(users).length) * 100).toFixed(2) }%`}</p>
                                ))}

                            <span>{optionOne.votes.length > 0 ? optionOne.votes.length : ''}</span>                                
                                <button disabled={this.alreadyAnswered()} onClick={() => this.handleVote('optionOne')}>Vote</button>
                            </div>
                        )}
                    </div>
                    <div className='option-2'>
                        <strong>Option 2</strong>
                        <p>
                            {optionTwo.text}
                        </p>
                        {this.props.isQuestion && (
                            <div className={((Object.keys(answers).includes(this.props.question.id))  && users[authedUser].answers[this.props.question.id] === 'optionTwo') ? 'active-option' : '' }>

                            {( (Object.keys(answers).includes(this.props.question.id) && (users[authedUser].answers[this.props.question.id]) ) && (
                                <p className='percentage'>{`This percentage of users voted for this one: ${((optionTwo.votes.length / Object.keys(users).length) * 100).toFixed(2) }%`}</p>
                            ))}

                            <span>{optionTwo.votes.length > 0 ? optionTwo.votes.length : ''}</span>                                
                                <button disabled={this.alreadyAnswered()} onClick={() => this.handleVote('optionTwo')}>Vote</button>
                            </div>
                        )}
                    </div>
                </div>  
                
            </div>
        )
    }
}

function mapStateToProps({questions, users, authedUser}, { id, isQuestion }) {
   
    let question = questions[id]
    const user = users[question.author]

    return {
        data: {...question, ...user },
        question,
        authedUser,
        users,
    }
}

export default connect(mapStateToProps)(Question)