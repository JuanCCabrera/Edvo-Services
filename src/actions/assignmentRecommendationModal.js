/**
 * selectRecommendation - Generates an object indicating to the central controller to select a recommendation and display its information on a Modal. 
 * @param {*} param0 - Object containing a recommendation's ID, title, header, location, description, challenge categories, topics, location
 * subject, language, school type, course format, course level, and course group size. 
 */
export const selectAssignmentRecommendationToDisplay = (
    {
        title = '',
        header = '',
        description = '',
        teachingStrategies = false,
        updatedMaterial = false,
        timeManagement = false,
        technologyIntegration = false,
        instructionAlignment = false,
        topics = [''],
        location = '',
        subject = '',
        language = 'spanish',
        type = 'event',
        schoolType = 'public',
        format = 'classroom',
        level = 'Kindergarden - 3rd grade',
        size = '1 - 10'
    } = {}) => ({
        type: 'SELECT_ASSIGNMENT_RECOMMENDATION_TO_DISPLAY',
        selectedAssignmentRecommendation:{
            title,
            header,
            description,
            subject,
            format,
            language,
            level,
            size, 
            topics,  
            location,
            type,
            schoolType,
            teachingStrategies,
            updatedMaterial,
            timeManagement,
            technologyIntegration,
            instructionAlignment
        }
});

/**
 * Action which is used to unmount the Assignment Recommendation modal. 
 */
export const clearAssignmentRecommendationModal = () => ({
    type: 'CLEAR_ASSIGNMENT_RECOMMENDATION_MODAL'
});
