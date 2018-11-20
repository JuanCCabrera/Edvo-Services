/**
 * selectRecommendation - Generates an object indicating to the central controller to select a recommendation and display its information on a Modal. 
 * @param {*} param0 - Object containing a recommendation's ID, title, header, location, description, challenge categories, 
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

export const clearAssignmentRecommendationModal = () => ({
    type: 'CLEAR_ASSIGNMENT_RECOMMENDATION_MODAL'
});
