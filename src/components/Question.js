import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'
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
        const { avatarURL, name, timestamp, optionOne, optionTwo } = this.props.data
        return (
            <div>
                <Link to={`/question/${this.props.question.id}`} className="question">
                    <div className='top-info'>
                        <div className='avatarImg' style={{background:`url(/${avatarURL}) no-repeat center center`}}></div>
                        <p className='user-name'>{name}</p>
                        <div className='question-date'>{moment(timestamp).format('L')}</div>
                    </div>
                </Link>
                <div className='questions-container'>
                    <div className='option-1'>
                        <strong>Option 1</strong>                    
                        <p>
                            {optionOne.text}
                        </p>
                        {this.props.isQuestion && (
                            <div>
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
                            <div>
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

export default withRouter(connect(mapStateToProps)(Question))