
/**
 * getVisibleTeacherRecommendations - Returns a list of teacher recommendations which only include the input filtering text in their title, header, description or location. 
 * The returned list also matches the read filtering category. If the 'all' options is selected, then no additional filtering is made. If the 'read' option
 * is selected, then only recommendations which have been read are returned. If the 'not read' option is selected, then recommendations which have not been read are returned. 
 * All elements in the list are automatically sorted based on the selected sorting category (date or rating). 
 * 
 * @param {*} teacherRecommendations - List of all recommendations available in the Teacher Recommendations page.  
 * @param {*} param1 - Text filter input, type sorting category (date or rating), and read filter category (all, read or not read)
 */
const getVisibleTeacherRecommendations = (recommendations, {text, checkType, read}) => {
    return recommendations.filter((reco) => {
        const titleMatch = reco.title.toLowerCase().includes(text.toLowerCase());
        const headerMatch = reco.header.toLowerCase().includes(text.toLowerCase());
        const descriptionMatch = reco.description.toLowerCase().includes(text.toLowerCase());
        let locationMatch = false;
        if(reco.location){
            locationMatch = reco.location.toLowerCase().includes(text.toLowerCase());
        }
        let typeCheck = true;
        if(read !== 'all'){
            if(read === 'read' && !reco.read){
                typeCheck = false;
            }else if(read === 'not_read' && reco.read){
                typeCheck =  false;
            }
        }
        return (titleMatch || headerMatch || descriptionMatch || locationMatch) && typeCheck;
    }).sort((a,b) => {
        if(checkType === 'rate'){
            return a.rate < b.rate ? 1 : -1;
        }
    });
};

export default getVisibleTeacherRecommendations;