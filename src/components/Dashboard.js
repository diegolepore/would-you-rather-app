import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'react-grid-system'
import Question from './Question'
import { Redirect } from 'react-router-dom'
import { Link, withRouter } from 'react-router-dom'


class Dashboard extends Component {

    state = {
      filterList: 'unanswered',

    }
  
    handleFilter = (e) => {
      const { value } = e.target

      this.setState({
        filterList: value
      })
    }

    render() {
        const {authedUser, questionsIds, questionsAnswered, questionsUnanswered, users, authedU} = this.props
        const { filterList } = this.state

        if (authedUser === null || authedUser === '') {
          return <Redirect to='/' />
        }

        return (
            <Container>
            <Row>
              <ul className='filters-input-items'>



                <li>
                <input
                  type='radio'
                  id='unanswered'
                  value='unanswered'
                  checked={filterList === 'unanswered'}
                  onChange={this.handleFilter}
                />
                <label for='unanswered'>Unanswered</label>
              </li>

                <li>
                  <input
                    type='radio'
                    id='answered'
                    value='answered'
                    checked={filterList === 'answered'}
                    onChange={this.handleFilter}
                  />
                  <label for='answered'>Answered</label>
                </li>

                <li>
                <input
                  type='radio'
                  id='all'
                  value='all'
                  checked={filterList === 'all'}
                  onChange={this.handleFilter}
                />
                <label for='all'>All</label>
              </li>

              </ul>
            </Row>
            
            <Row>
              <ul className='questions-item-main'>

                  {filterList === 'all' &&  (
                      questionsIds.map((id) => (
                      <li className='question-item' key={id}>
                      <Link to={`/question/${id}`} className="question">
                        <Question id={id} filterBy={filterList} />
                      </Link>
                      </li>
                    ))
                  )}
                {/*console.log('AUTHED:', (!Object.keys(authedU.answers). ))*/}
                  {filterList === 'answered' &&  (
                    questionsIds.map((id) => (
                      (Object.keys(authedU.answers).includes(id) &&
                      <li className='question-item' key={id}>
                      <Link to={`/question/${id}`} className="question">
                        <Question id={id} filterBy={filterList} />
                      </Link>
                      </li>
                      )
                    ))
                  )}
                  
                  {filterList === 'unanswered' &&  (
                    questionsIds.map((id) => (
                      (!Object.keys(authedU.answers).includes(id) &&
                      <li className='question-item' key={id}>
                      <Link to={`/question/${id}`} className="question">
                        <Question id={id} filterBy={filterList} />
                      </Link>
                      </li>
                      )
                    ))
                  )}
                  
                  {filterList === 'unanswered' && questionsUnanswered.length < 1 && ( <h2>No results</h2> )}              
              </ul>
            </Row>

          </Container>
        )
    }
}

function mapStateToProps ({ questions, authedUser, users }) {



    return {
      authedU: users[authedUser],
      questionsIds: Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
      authedUser,
      questionsAnswered: Object.keys(questions).filter((key) => {
        return  (questions[key].optionOne.votes.length > 0 || questions[key].optionTwo.votes.length > 0)
      }).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
      questionsUnanswered: Object.keys(questions).filter((key) => {
        return (questions[key].optionOne.votes.length === 0 || questions[key].optionTwo.votes.length === 0)
      }).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
  }
  
  export default withRouter(connect(mapStateToProps)(Dashboard))