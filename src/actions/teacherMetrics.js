//Load Teacher Metrics
export const loadTeacherDaysInPlatform = ({daysInPlatform = 0} = {}) => {
    return{
        type: 'LOAD_TEACHER_DAYS_IN_PLATFORM',
        daysInPlatform: daysInPlatform
    }
}

export const loadTeacherTopRecommendation = ({
    recoID = '',
    title = '',
    header = '',
    location = '',
    description = '',
    multimedia = '',
    date = '',
    rating = 0,
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
            rating: rating
        }
    }
}

export const loadTeacherRecentRecommendation = ({
    recoID = '',
    title = '',
    header = '',
    location = '',
    description = '',
    multimedia = '',
    date = '',
    rating = 0
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
            rating: rating
        }
    }
}
