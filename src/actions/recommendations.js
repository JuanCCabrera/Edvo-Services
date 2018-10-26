import axios from 'axios';
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
    axios.post('http://localhost:8081/recommendation/add', {
        id,
                title: title,
                multimedia: multimedia,
                header: header,
                description: description,            
                teachingStrategies: teachingStrategies,
                updatedMaterial: updatedMaterial,
                timeManagement: timeManagement,
                technologyIntegration: technologyIntegration,
                instructionAlignment: instructionAlignment,            
                moodle: moodle,
                googleClassroom: googleClassroom,
                emailResource: emailResource,
                books: books,
                socialMedia: socialMedia,
                projector: projector,
                computer: computer,
                tablet: tablet,
                stylus: stylus,
                internet: internet,
                smartboard: smartboard,
                smartpencil: smartpencil,
                speakers: speakers,                
                topics: topics,
                location: location,
                subject: subject,
                language: language,
                type: type,
                schoolType: schoolType,
                format: format,
                level: level,
                size: size,
            
                question: question,
                choices: choices,
                correctOption: correctOption
    }).then((response)=>{
        //Redirect to Manage Recommendations
    });
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
