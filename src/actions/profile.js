/**
 * Generates an object containing a user's name, last name, date of birth and gender so that it can be displayed in the Settings page in an editable format. 
 * @param {*} param0 - Object containing a user's name, last name, date of birth and gender. 
 */
export const loadProfile = ({
name = '',
lastName = '',
dateOfBirth = moment(),
gender = 'male'
} = {}) => {
    return{
        type: 'LOAD_PROFILE',
        profile:{
            name,
            lastName,
            dateOfBirth,
            gender
        }
    }
}