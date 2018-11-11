//Add user
export const addSchool = (
    {
        id = '',
        name = '',
        location = '',
        type= '',
        numAccounts = 0,
    } = {}) => ({
        type: 'ADD_SCHOOL',
        school: {
            id,
            name,
            location,
            type,
            numAccounts,
        }
});

//Remove user
export const removeSchool = ({id} = {}) => ({
    type: 'REMOVE_SCHOOL',
    id: id
});

export const unloadInstitutions = () => {
    return {
        type: 'UNLOAD_INSTITUTIONS'
    }
};

