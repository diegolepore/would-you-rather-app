import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { handleAddQuestionUser } from '../actions/users'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system';


class AddQuestion extends Component {

    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false,
      }
      handleChangeOne = (e) => {
        const optionOneText = e.target.value
    
        this.setState(() => ({
            optionOneText
        }))
      }
      handleChangeTwo = (e) => {
        const optionTwoText = e.target.value
    
        this.setState(() => ({
            optionTwoText
        }))
      }
      handleSubmit = (e) => {
        e.preventDefault()
    
        const { optionOneText, optionTwoText } = this.state
        const { dispatch, author, users } = this.props
    
        // todo: Add Tweet to Store
        console.log(this.props)
    
        dispatch(handleAddQuestionUser({ optionOneText, optionTwoText, author, users }))
        dispatch(handleAddQuestion({ optionOneText, optionTwoText, author }))
        
    
        // console.log('New Tweet: ', text)
    
        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: true,
        }))
      }

    render() {
        const { optionOneText, optionTwoText, toHome} = this.state
        const { author } = this.props
        
        if (toHome === true) {
            return <Redirect to='/dashboard' />
        } 

        if (author === null || author === '') {
            return <Redirect to='/' />
        }

        return (

            

            <form className='new-tweet' onSubmit={this.handleSubmit}>
                <Container>
                    <ul className='inner-container'>
                        <Row>
                            <Col md={12}>
                                <h2>Add question</h2>
                            </Col>

                            <Col md={6}>            
                                <textarea
                                    placeholder="Option 1"
                                    value={optionOneText}
                                    onChange={this.handleChangeOne}
                                    className='textarea'
                                />
                            </Col>

                            <Col md={6}>               
                                <textarea
                                    placeholder="Option 2"
                                    value={optionTwoText}
                                    onChange={this.handleChangeTwo}
                                    className='textarea'
                                />
                            </Col>

                            <Col md={12}>    
                                <button
                                    className='btn'
                                    type='submit'
                                    disabled={optionOneText === '' || optionTwoText === '' }>
                                    Submit
                                </button>
                            </Col>
                        </Row>
                    </ul>
                </Container>
            </form>
        )
    }
}

function mapStateToProps ({ authedUser, users }) {
    return {
      author: authedUser,
      users,
    }
  }

export default connect(mapStateToProps)(AddQuestion)