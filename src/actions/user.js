//Add user
export const addUser = (
    {
        id = '',
        name = '',
        lastName = '',
        weeklyReco = false,
        categories = []
    } = {}) => ({
        type: 'ADD_USER',
        user: {
            id,
            name,
            lastName,
            weeklyReco,
            categories
        }
});

//Remove user
export const removeUser = ({id} = {}) => ({
    type: 'REMOVE_USER',
    id: id
});


