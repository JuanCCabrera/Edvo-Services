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



