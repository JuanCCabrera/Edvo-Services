//Add user
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

//Remove user
export const removeUser = ({id} = {}) => ({
    type: 'REMOVE_USER',
    id: id
});


