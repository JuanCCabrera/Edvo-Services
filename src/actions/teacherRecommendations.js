//Teacher Recommendations Action Generators

export const loadTeacherRecommendation = (
    {
        recoID =  '',
        title = '',
        header = '',
        location = '',
        description = '',
        multimedia = '',
        date = '',
        read = false,
        rate = 0
    } = {}) => ({
        type: 'LOAD_TEACHER_RECOMMENDATION',
        recommendation: {
            recoID,
            title,
            header,
            location,
            description,
            multimedia,
            date,
            read,
            rate
        }
});

export const loadTeacherFavoriteRecommendation = (
    {
        recoID =  '',
        title = '',
        header = '',
        location = '',
        description = '',
        multimedia = '',
        date = '',
        read = false,
        rate = 0
    } = {}) => ({
        type: 'LOAD_TEACHER_FAVORITE_RECOMMENDATION',
        favoriteRecommendation: {
            recoID,
            title,
            header,
            location,
            description,
            multimedia,
            date,
            read,
            rate
        }
});

export const selectRecommendation = (
    {
        recoID =  '',
        title = '',
        header = '',
        location = '',
        description = '',
        multimedia = '',
        date = '',
        read = false,
        rate = 0
    } = {}) => ({
        type: 'SELECT_RECOMMENDATION',
        selectedRecommendation:{
            recoID: recoID,
            title: title,
            header: header,
            location: location,
            description: description,
            multimedia: multimedia,
            date: date,
            read: read,
            rate: rate
        }
});

export const clearSelectedRecommendation = () => ({type: 'CLEAR_SELECTED_RECOMMENDATION'});

export const rateRecommendation = ({recoID = '', rate = 0} = {}) => (
    {
        type:'RATE_RECOMMENDATION',
        recoID: recoID,
        rate: rate
});



