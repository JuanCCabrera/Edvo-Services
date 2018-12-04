//Teacher Recommendations Action Generators

/**
 * loadTeacherRecommendation - Generates an object indicating to the central controller to load a recommendation to the Teacher Recommendations list. 
 * @param {*} param0 - Object containing a recommendation's ID, title, header, location, description, multimedia template, date in which it was assigned, boolean indicating whether it has been read or not (read = true), and an associated rating
 */
export const loadTeacherRecommendation = (
    {
        recoID =  '',
        title = '',
        header = '',
        location = '',
        description = '',
        multimedia = '',
        date = '',
        read = true,
        rate = 0
    } = {}) => (
        {
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

/**
 * loadTeacherFavoriteRecommendation - Generates object indicating to the central controller to load a recommendation to the Favorite Teacher Recommendations List. 
 * @param {*} param0 - Object containing a recommendation's ID, title, header, location, description, multimedia template, date in which it was assigned, boolean indicating whether it has been read or not (read = true), and an associated rating
 */
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

/**
 * selectRecommendation - Generates an object indicating to the central controller to select a recommendation and display its information on a Modal. 
 * @param {*} param0 - Object containing a recommendation's ID, title, header, location, description, multimedia template, date in which it was assigned, boolean indicating whether it has been read or not (read = true), and an associated rating
 */
export const selectRecommendation = (
    {
        recoID =  '',
        title = '',
        header = '',
        location = '',
        description = '',
        multimedia = '',
        date = '',
        read = true,
        rate = 0,
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

/**
 * clearSelectedRecommendation - Generates a command keyword to the central controller indicating that it must make the modal containing the selected recommendation information invisible. 
 */
export const clearSelectedRecommendation = () => ({type: 'CLEAR_SELECTED_RECOMMENDATION'});

/**
 * rateRecommendation - Generates an object indicating to the central controller that the rating of a recommendation has been changed. 
 * @param {*} param0 - Object containing a recommendation's ID and associated rating
 */
export const rateRecommendation = ({recoID = '', rate = 0} = {}) => (
    {
        type:'RATE_RECOMMENDATION',
        recoID: recoID,
        rate: rate
});

/**
 * addFavoriteRecommendation - Generates object indicating to the central controller that a recommendation has been marked as a favorite and must be added to the Favorite Teacher Recommendations List. 
 * @param {*} param0 - Object containing a recommendation's ID, title, header, location, description, multimedia template, date in which it was assigned, boolean indicating whether it has been read or not (read = true), and an associated rating
 */
export const addFavoriteRecommendation = (
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
        type: 'ADD_FAVORITE_RECOMMENDATION',
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

/**
 * removeFavoriteRecommendation - Generates object indicating to the central controller that it must remove a recommendation from the Favorite Recommendations List. 
 * @param {*} param0 - Object containing a recommendation's ID
 */
export const removeFavoriteRecommendation = (
    {
        recoID = ''
    } = {}) => ({
        type: 'REMOVE_FAVORITE_RECOMMENDATION',
        recoID: recoID
});


/**
 * unloadTeacherRecommendations - Generates an object with a command keyword indicating to the central controller that it must erase all local teacher recommendation data. 
 */
export const unloadTeacherRecommendations = () => {
    return {
        type: 'UNLOAD_TEACHER_RECOMMENDATIONS'
    }
};



