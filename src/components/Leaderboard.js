import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-grid-system';
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component {
    render() {
        const { users, usersId, authedUser } = this.props

        if (authedUser === null || authedUser === '') {
            return <Redirect to='/' />
        }
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <ul>
                            {usersId.map((item)=> (
                                <li className='leaderboard-li' key={users[item].id}>
                                    <div className='avatarImg' style={{background:`url(/${users[item].avatarURL}) no-repeat center center`}}></div> 
                                    <div className='vert-divider'></div>
                                    <p>{users[item].name}</p>
                                    <p>{`Questions: ${users[item].questions.length}`}</p>
                                    <p>{`Answers: ${Object.keys(users[item].answers).length}`}</p>
                                </li>
                            )) }
                        </ul>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps ({ users, authedUser }) {
    return {
        users,
        authedUser,
        usersId: Object.keys(users)
            .sort((a,b) =>  (Object.keys(users[b].answers).length + users[b].questions.length ) - (Object.keys(users[a].answers).length + users[a].questions.length) ),
    }
}

export default connect(mapStateToProps)(Leaderboard);