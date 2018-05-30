export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}

export function handleSetAuthedUser(id) {
    return (dispatch) => {
        console.log(id)
        if(id !== null || id !== '') {
            dispatch(setAuthedUser(id))
            return true
        }else {
            return false
        }
    }
}