const getVisibleSchools = (schools, {text}) => {
    return schools.filter((school) => {
        const nameMatch = school.name.toLowerCase().includes(text.toLowerCase());
        const locationMatch = school.location.toLowerCase().includes(text.toLowerCase());
        const typeMatch = school.type.toLowerCase().includes(text.toLowerCase());
        return (nameMatch || locationMatch || typeMatch);
    }).sort((a,b) => {
        return a.numAccounts < b.numAccounts ? 1 : -1;
    });
};

export default getVisibleSchools;