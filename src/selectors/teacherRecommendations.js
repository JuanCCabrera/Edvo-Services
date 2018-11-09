const getVisibleTeacherRecommendations = (recommendations, {text, checkType, read}) => {
    return recommendations.filter((reco) => {
        const titleMatch = reco.title.toLowerCase().includes(text.toLowerCase());
        const headerMatch = reco.header.toLowerCase().includes(text.toLowerCase());
        const descriptionMatch = reco.description.toLowerCase().includes(text.toLowerCase());
        const locationMatch = reco.location.toLowerCase().includes(text.toLowerCase());
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