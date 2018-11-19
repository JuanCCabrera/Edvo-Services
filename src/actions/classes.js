//Class Action Generators

/**
 * loadClass - Generates an object containing the subject, format, language, level, group size, and topics of a class belonging to a user of the Teacher type. 
 * @param {*} param0 - Object containing relevant class information which is filled by a user during his or her registration.
 * The object also includes the ID of the user and the ID of the class that were generated by the database. 
 */
export const loadClass = (
    {
        userId = '',
        classInfoId = '',
        subject = '',
        format = '',
        language = '',
        level = '',
        groupSize = '',
        topicA = '',
        topicB = '',
        topicC = '',
    } = {}) => {
        return {
            type: 'LOAD_CLASS',
            class: {
                userId,
                classInfoId,
                subject,
                format,
                language,
                level,
                groupSize,
                topicA,
                topicB,
                topicC
            }
        }
};

/**
 * removeClass - Generates an object with the ID of a class. This object is used to find and remove a class from the system. 
 * @param {*} param0 - Object containing the ID of a specific class. 
 */
export const removeClass = ({classInfoId = ''} = {}) => {
    return {
        type: 'REMOVE_CLASS',
        classInfoId: classInfoId
    }
};