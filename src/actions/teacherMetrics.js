//Load Teacher Metrics

export const reset = () => {
    return{
        type: 'RESET'
    }
}

//Teacher Metrics Action Generators

/**
 * loadTeacherDaysInPlatform - Generates an object indicating to the central controller that the number of days specified must be displayed in the Teacher Home page. 
 * @param {*} param0 - Object containing the number of days a teacher has logged in to the platform.
 */
export const loadTeacherDaysInPlatform = ({daysInPlatform = 0} = {}) => {
    
    return{
        type: 'LOAD_TEACHER_DAYS_IN_PLATFORM',
        daysInPlatform: daysInPlatform
    }
}

/**
 * loadTeacherQuestionsAsked - Generates object which indicates to the controller that it must store the number of questions the user has
 * asked based on a given input value. 
 * @param {*} param0 - Object containing the number of questions that have been asked by the user. 
 */
export const loadTeacherQuestionsAsked = ({questionsAsked = 0} = {}) => {
    return{
        type: 'LOAD_TEACHER_QUESTIONS_ASKED',
        questionsAsked: questionsAsked
    }
}

/**
 * loadTeacherRecommendationsRead - Generates object which indicates to the controller that it must store the number of recommendations
 * the user has read based on a given input number value. 
 * @param {*} param0 - Object containing the number of recommendations that have been read by the user. 
 */
export const loadTeacherRecommendationsRead = ({recommendationsRead = 0} = {}) => {
    return{
        type: 'LOAD_TEACHER_RECOMMENDATIONS_READ',
        recommendationsRead: recommendationsRead
    }
}
/**
 * loadTeacherTopRecommendation - Generates an object indicating to the central controller to load a recommendation to the Top Recommendations List. 
 * @param {*} param0 - Object containing information relating to the recommendations which have been most highly rated by a teacher.
 * The object must contain the ID of the recommendation and its title, header, location, description, multimedia template, date of assignment, and rating. 
 */
export const loadTeacherTopRecommendation = ({
    recoID = '',
    title = '',
    header = '',
    location = '',
    description = '',
    multimedia = '',
    date = '',
    rate = 0,
    read = true
} = {}) => {
    return{
        type: 'LOAD_TEACHER_TOP_RECOMMENDATION',
        topRecommendation: {
            recoID: recoID,
            title: title,
            header: header,
            location: location,
            description: description,
            multimedia: multimedia,
            date: date,
            rate: rate,
            read: read
        }
    }
}

/**
 * loadTeacherRecentRecommendation - Generates an object indicating to the central controller to load a recommendation to the Recent Recommendations List. 
 * @param {*} param0 - Object containing information relating to the recommendations which have been most recently assigned to a teacher.
 * The object must contain the ID of the recommendation and its title, header, location, description, multimedia template, date of assignment, and rating. 
 */
export const loadTeacherRecentRecommendation = ({
    recoID = '',
    title = '',
    header = '',
    location = '',
    description = '',
    multimedia = '',
    date = '',
    rate = 0,
    read = true
} = {}) => { 
    return{
        type: 'LOAD_TEACHER_RECENT_RECOMMENDATION',
        mostRecentrecommendation: {
            recoID: recoID,
            title: title,
            header: header,
            location: location,
            description: description,
            multimedia: multimedia,
            date: date,
            rate: rate,
            read: read
        }
    }
}

/**
 * Generates object which describes a recommendation ID an a new rating associated to it. 
 * @param {*} param0 - Recommendation ID and rating
 */
export const rateTopAndMostRecent = ({
    recoID = '',
    rate = 0
} = {}) => {
    return{
        type: 'RATE_TOP_AND_MOST_RATED',
        recoID: recoID,
        rate: rate
    }
}
