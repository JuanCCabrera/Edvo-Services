/**
 * selectRecommendation - Generates an object indicating to the central controller to select a recommendation and display its information on a Modal. 
 * @param {*} param0 - Object containing a recommendation's ID, title, header, location, description, multimedia template, date in which it was assigned, boolean indicating whether it has been read or not (read = true), and an associated rating
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

export const setUserModal = () => ({
    type: 'TOGGLE_USER_MODAL'
});

export const clearUserModal = () => ({
    type: 'CLEAR_USER_MODAL'
});

