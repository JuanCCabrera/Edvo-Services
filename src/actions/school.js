//School Action Generators

/**
 * addSchool - Generates an object indicating to the central controller to add a school to the list of schools available in the AppSchools page. 
 * @param {*} param0 - Object containing a school's ID, name, location, type (private, public, independent), and number of accounts linked to the school. 
 */
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

/**
 * removeSchool - Generates an object indicating to the central controller to remove the school with the specified ID from the system. 
 * @param {*} param0 - Object containing the ID of a school. 
 */
export const removeSchool = ({id} = {}) => ({
    type: 'REMOVE_SCHOOL',
    id: id
});

/**
 * unloadInstitutions - Generates an object with a command keyword indicating to the central controller that it must erase all institution data locally. 
 */
export const unloadInstitutions = () => {
    return {
        type: 'UNLOAD_INSTITUTIONS'
    }
};

