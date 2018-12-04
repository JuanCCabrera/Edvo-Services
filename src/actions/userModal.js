/**
 * selectUserToDisplay - Generates an object indicating to the central controller to select a user and display his or her information on a Modal. 
 * @param {*} param0 - Object containing a user's registration information as described in the Registration Form. 
 */
export const selectUserToDisplay = (
    {
        name = '',
        lastName = '',
        email = '',
        subject = '',
        format = 'classroom',
        language = 'spanish',
        level = 'Kindergarden - 3rd grade',
        groupsize = '1 - 10', 
        topica = '', 
        topicb = '', 
        topicc = '',  
        moodle = false, 
        googleclassroom = false, 
        emails = false, 
        books = false, 
        applications = false, 
        socialmedia = false, 
        projector = false, 
        computer = false, 
        tablet = false, 
        stylus = false, 
        internet = false, 
        smartboard = false, 
        smartpencil = false , 
        speakers = false,
    } = {}) => ({
        type: 'SELECT_USER_TO_DISPLAY',
        selectedUser:{
            name,
            lastName,
            email,
            subject,
            format,
            language,
            level,
            groupsize, 
            topica, 
            topicb, 
            topicc,  
            moodle, 
            googleclassroom, 
            emails, 
            books, 
            applications, 
            socialmedia, 
            projector, 
            computer, 
            tablet, 
            stylus, 
            internet, 
            smartboard, 
            smartpencil , 
            speakers,
        }
});

/**
 * clearUserModal - Generates object indicating to the central controller that it must stop displaying the User Modal in the
 * Assign Recommendations page. 
 */
export const clearUserModal = () => ({
    type: 'CLEAR_USER_MODAL'
});

