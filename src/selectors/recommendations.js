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
            
        }
        return (titleMatch || headerMatch || descriptionMatch || locationMatch || subjectMatch || schoolTypeMatch) && typeCheck;
    });
};

export default getVisibleRecommendations;