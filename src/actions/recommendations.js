import axios from 'axios';
//Recommendations Action Generators

/**
 * createRecommendation - Generates an object indicating to the central controller to create a new recommendation using the input data obtained from the Create Recommendation Form. 
 * @param {*} param0 - Object containing a slew of fields which identify a recommendation, including the ID of said recommendation obtained form the database. 
 */
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
    type = 'event',
    schoolType = 'public',
    format = 'classroom',
    level = 'Kindergarden - 3rd grade',
    size = '1 - 10',

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

/**
 * loadRecommendation - Generates an object indicating to the central controller to store the input recommendation data in the local data storage so it may be viewed in the Assign Recommendations and Manage Recommendations pages. 
 * @param {*} param0 - Object containing all of the information related to a recommendation as seen in the Create Recommendation Form. 
 */
export const loadRecommendation = (
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
    type = 'event',
    schoolType = 'public',
    format = 'classroom',
    level = 'Kindergarden - 3rd grade',
    size = '1 - 10',

    question = '',
    choices = [''],
    correctOption = 0
} = {}) => {
    return {
        type: 'LOAD_RECOMMENDATION',
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

/**
 * removeRecommendation - Generates an object indicating to the central controller to remove a recommendation with a specified ID. 
 * @param {*} param0 - Object containing the ID of a recommendation. 
 */
export const removeRecommendation = ({id} = {}) => {
    return {
        type: 'REMOVE_RECOMMENDATION',
        id: id
    }
}

/**
 * editRecommendation - Generates an object indicating to the central controller that a recommendation's data has been edited and that it has been updated in the database. 
 * @param {*} id - ID of a recommendation
 * @param {*} updates - Object containing all updates made to a recommendation upon editing. All fields of the object must match those that exist in the createRecommendation action. 
 */

export const editRecommendation = (id, updates) => ({
    type: 'EDIT_RECOMMENDATION',
    id: id,
    updates: updates
});

export const unloadRecommendations = () => {
    return {
        type: 'UNLOAD_RECOMMENDATIONS'
    }
};

