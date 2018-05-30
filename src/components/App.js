import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import QuestionPage from './QuestionPage'
import Dashboard from './Dashboard'
import AddQuestion from './AddQuestion'
import Nav from './Nav'
import LogginArea from './LogginArea'
import Leaderboard from './Leaderboard'

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }

  render() {

    const { authedUser } = this.props
    
    return (
      <Router>
        <Fragment>
          {authedUser !== null &&(
            <Nav />
          )}
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/leaderboard' exact component={Leaderboard} />
          <Route path='/add' exact component={AddQuestion} />
          <Route path='/question/:id' component={QuestionPage} />
          <Route path='/' exact component={LogginArea} />
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(App)


