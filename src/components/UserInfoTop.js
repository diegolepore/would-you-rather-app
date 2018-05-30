import React, {Component} from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class UserInfoTop extends Component {
  
  
 
handleLogout = () => {
  const { dispatch } = this.props
  dispatch(handleSetAuthedUser(null))
}

getAuthedInfo = () => {
    const { users, authedUser } = this.props
    return (
        <div className='innerUserInfo'>
          <div className='avatarImg' style={{background:`url(/${users[authedUser].avatarURL}) no-repeat center center`}}></div> 
          <p>{users[authedUser].name}</p>

          <div className='user-info-top'>
            <button className='logout-btn' onClick={()=> this.handleLogout()}>Log out</button>
          </div>

        </div>
    )
}

  render(){
    const { users, authedUser } = this.props

    return (
        <div className='userInfo'>
            {users[authedUser] == null ? 
              <Redirect to='/' />
            : 
            this.getAuthedInfo()
            }
        </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  return {
    authedUser,
    users,
  }
}

export default connect(mapStateToProps)(UserInfoTop)