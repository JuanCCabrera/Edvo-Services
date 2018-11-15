//User Action Generators

/**
 * addUser - Generates an object indicating to the central controller that a user must be added to the User List. 
 * @param {*} param0 - Object containing a user ID, name, last name, user email, a boolean indicating whether a user has received a weekly recommendation during the current week (has received one = true), and a list of categories that the user marked during his or her registration process. 
 */
export const addUser = (
    {
        id = '',
        name = '',
        lastName = '',
        email= '',
        weeklyReco = false,
        categories = []
    } = {}) => ({
        type: 'ADD_USER',
        user: {
            id,
            name,
            lastName,
            email,
            weeklyReco,
            categories
        }
});

/**
 * removeUser - Generates an object indicating to the central controller that a user with a specified ID must be removed from the User List. 
 * @param {*} param0 - Object containing a user's ID
 */
export const removeUser = ({id} = {}) => ({
    type: 'REMOVE_USER',
    id: id
});


