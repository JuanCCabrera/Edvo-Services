/**
 * getVisibleSchools - Returns a list of schools which only include a name, location or type that match the input filter text. 
 * There are sorted automatically by number of accounts linked to the schools. 
 * @param {*} schools - List of all schools available in the AppSchools page. 
 * @param {*} param1 - Text filter input 
 */
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