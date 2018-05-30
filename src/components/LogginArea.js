import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions/authedUser'

class LogginArea extends Component {

    state = {
        value: '',
        canLoggIn: false,
      }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        const { dispatch } = this.props
        if(this.state.value !== '' ) {
            dispatch(handleSetAuthedUser(this.state.value))
            this.setState(() => ({
                canLoggIn: true
            }))
        }
        event.preventDefault();
    }

    render() {
        const { users, usersKeys } = this.props

        if(this.state.canLoggIn ){
            return <Redirect to='/dashboard' />
        }else {
            return (
                <div className='loggin-box'>
                    <form onSubmit={this.handleSubmit}>
                        <p className='loggin-title'>Select your User</p>
                                
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option>Select an option</option>
                            {usersKeys.map((item)=> (
                                <option value={item} key={item}>{users[item].name}</option>
                            ))}
                        </select>
                        
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )
        }   
    }
}

function mapStateToProps ({ authedUser, users }) {
    return {
      authedUser,
      users,
      usersKeys: Object.keys(users),
    }
  }

export default connect(mapStateToProps)(LogginArea);