//User Action Generators

/**
 * addUser - Generates an object indicating to the central controller that a user must be added to the User List. 
 * @param {*} param0 - Object containing a user ID, name, last name, user email, a boolean indicating whether a user has received a weekly recommendation during the current week (has received one = true), and a list of categories that the user marked during his or her registration process. 
 */
export const addUser = (
    {
        id = 'test_id',
        name = 'test_name',
        lastName = 'test_last_name',
        email = 'aaa@aaa.com',
        subject = 'Test Subject',
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
        weeklyReco = false,
        categories = []
    } = {}) => ({
        type: 'ADD_USER',
        user: {
            id,
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

/**
 * unloadUsers - Generates an object indicating to the central controller that it must erase a locally stored user's data. 
 * @param {*} param0 - Object containing a user's ID. 
 */
export const unloadUsers = ({id} = {}) => ({
    type: 'UNLOAD_USERS',
    id: id
});


