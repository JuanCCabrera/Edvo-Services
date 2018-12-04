/**
 * getVisibleRecommendations - Returns a list of recommendations which only include the text input in their title, header, description, location, subject or associated school type. 
 * The list will also only contain recommendations which fall into the selected filtering category. 
 * Categories: 
 * Technolgy Integration
 * Updated Material
 * Teaching Strategies
 * Instructional Alignment
 * Time Management
 * @param {*} recommendations - Full list of recommendations available in Assign Recommendations and Manage Recommendations pages. 
 * @param {*} param1 - Text filter input and recommendation category selection from Recommendations Filters
 */
const getVisibleRecommendations = (recommendations, {text, category}) => {
    return recommendations.filter((reco) => {
        const titleMatch = reco.title.toLowerCase().includes(text.toLowerCase());
        const headerMatch = reco.header.toLowerCase().includes(text.toLowerCase());
        const descriptionMatch = reco.description.toLowerCase().includes(text.toLowerCase());
        //Only try to match by location if the location exists. 
        let locationMatch = false;
        if(reco.location){
            locationMatch = reco.location.toLowerCase().includes(text.toLowerCase());
        }
        const subjectMatch = reco.subject.toLowerCase().includes(text.toLowerCase());
        const schoolTypeMatch = reco.schoolType.toLowerCase().includes(text.toLowerCase());
        //Only try to match by challenge category if the category is not set to 'all'. 
        let typeCheck = true;
        if(category !== 'all'){
            if(category === 'Technology Integration' && !reco.technologyIntegration){
                typeCheck = false;
            }else if(category === 'Updated Material' && !reco.updatedMaterial){
                typeCheck = false;
            }else if(category === 'Teaching Strategies' && !reco.teachingStrategies){
                typeCheck = false;
            }else if(category === 'Instructional Alignment' && !reco.instructionAlignment){
                typeCheck = false;
            }else if(category === 'Time Management' && !reco.timeManagement){
                typeCheck = false;
            }
        }
        return (titleMatch || headerMatch || descriptionMatch || locationMatch || subjectMatch || schoolTypeMatch) && typeCheck;
    });
};

export default getVisibleRecommendations;