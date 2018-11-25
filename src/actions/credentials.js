export const setAuthentication = ({isAuthenticated = false} = {}) => {
    return {
        type: 'SET_AUTHENTICATION',
        isAuthenticated: isAuthenticated
    }
}

export const setRole = ({role = null} = {}) => {
    return{
        type: 'SET_ROLE',
        role: role
    }
}