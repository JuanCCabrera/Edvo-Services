const getVisibleRecommendations = (recommendations, {text, category}) => {
    return recommendations.filter((reco) => {
        const titleMatch = reco.title.toLowerCase().includes(text.toLowerCase());
        const headerMatch = reco.header.toLowerCase().includes(text.toLowerCase());
        const descriptionMatch = reco.description.toLowerCase().includes(text.toLowerCase());
        const locationMatch = reco.location.toLowerCase().includes(text.toLowerCase());
        const subjectMatch = reco.subject.toLowerCase().includes(text.toLowerCase());
        const schoolTypeMatch = reco.schoolType.toLowerCase().includes(text.toLowerCase());
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