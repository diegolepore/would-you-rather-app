import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Container, Row } from 'react-grid-system';
import { Redirect } from 'react-router-dom'


class QuestionPage extends Component {
  render() {
    const { id, authedUser } = this.props
    
    if (authedUser === null || authedUser === '') {
        return <Redirect to='/' />
    }
    return (
        <Container>
            <Row>
                <div className='questions-item-main'>

                    <h1>Would you rather...?</h1>

                    <div className='question-item' key={id}>
                        <Question id={id} isQuestion={true} />
                    </div>
                </div>
            </Row>
        </Container>
    )
  }
}

function mapStateToProps ({questions, users, authedUser}, props) {
    const { id } = props.match.params
    return {
        id,
        test: props.match.params,
        authedUser,
    }
}
  
export default connect(mapStateToProps)(QuestionPage)