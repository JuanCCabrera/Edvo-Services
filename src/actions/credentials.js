//Credentials Action Generators

/**
 * setAuthentication - Generates an object which is used to set the authentication status of a user in the controller. If true, it means the user has been successfully authenticated by Auth0. 
 * If false, the user has not been successfully authenticated. 
 * @param {*} param0 - Object containing a boolean indicator of whether a user has been authenticated by Auth0 (true) or not (false).
 */
export const setAuthentication = ({isAuthenticated = false} = {}) => {
    return {
        type: 'SET_AUTHENTICATION',
        isAuthenticated: isAuthenticated
    }
}

/**
 * setRole - Generates an object which is used to set the role of an authenticated user in the controller. 
 * @param {*} param0 - Object containing a string indicating the role of an authenticated user. This value can be null, "teacher", "mentor", "admin", or "school". 
 */
export const setRole = ({role = null} = {}) => {
    return{
        type: 'SET_ROLE',
        role: role
    }
}