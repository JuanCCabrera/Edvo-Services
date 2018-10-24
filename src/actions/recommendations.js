export const createRecommendation = (
    {
    id = '',
    title = '',
    multimedia = '',
    header = '',
    description = '',

    teachingStrategies = false,
    updatedMaterial = false,
    timeManagement = false,
    technologyIntegration = false,
    instructionAlignment = false,

    moodle = false,
    googleClassroom = false,
    emailResource = false,
    books = false,
    socialMedia = false,
    projector = false,
    computer = false,
    tablet = false,
    stylus = false,
    internet = false,
    smartboard = false,
    smartpencil = false,
    speakers = false,
    
    topics = [''],
    location = '',
    subject = '',
    language = 'spanish',
    type = '',
    schoolType = 'public',
    format = 'classroom',
    level = 'first',
    size = 'small',

    question = '',
    choices = [''],
    correctOption = 0
} = {}) => {
    return {
        type: 'CREATE_RECOMMENDATION',
        recommendation: {
                id,
                title,
                multimedia,
                header,
                description,
            
                teachingStrategies,
                updatedMaterial,
                timeManagement,
                technologyIntegration,
                instructionAlignment,
            
                moodle,
                googleClassroom,
                emailResource,
                books,
                socialMedia,
                projector,
                computer,
                tablet,
                stylus,
                internet,
                smartboard,
                smartpencil,
                speakers,
                
                topics,
                location,
                subject,
                language,
                type,
                schoolType,
                format,
                level,
                size,
            
                question,
                choices,
                correctOption
        }
    }
}

export const removeRecommendation = ({id} = {}) => {
    return {
        type: 'REMOVE_RECOMMENDATION',
        id: id
    }
}
