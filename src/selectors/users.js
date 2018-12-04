/**
 * getVisibleUsers - Returns a list of all users which only include names, last names, full names, or emai which match the filtering text. 
 * Additionally, if a type of user category is selected, then additional filtering is done. If 'all' is selected, then no additional filtering is needed. 
 * If 'assigned' is selected, then only users which have been assigned recommendations during the current week will be selected. If 'not assigned' is selected, then the opposite set of users will be returned. 
 * @param {*} users - List of users available in the AppUsers and Assign Recommendations page. 
 * @param {*} param1 - Text filter input and user type categorized into three forms (all, assigned and not assigned). Each category indicates if a user has been or has not been assigned a recommendation during the current week. 
 */
const getVisibleUsers = (users, {text,checkType}) => {
    return users.filter((user) => {
        const textMatch = user.name.toLowerCase().includes(text.toLowerCase());
        const lastNameMatch = user.lastName.toLowerCase().includes(text.toLowerCase());
        const fullNameMatch = (user.name + ' ' + user.lastName).toLowerCase().includes(text.toLowerCase());
        const emailMatch = user.email.toLowerCase().includes(text.toLowerCase());
        //Only check if a user has been assigned a recommendation in the current week if the assignment status filter is not set to 'all'. 
        let typeCheck = true;
        if(checkType !== 'all'){
            if(checkType === 'assigned'){
                if(user.weeklyReco === true){
                    typeCheck = true;
                }else{
                    typeCheck = false;
                }
            }else if (checkType === 'not_assigned'){
                if(user.weeklyReco === false){
                    typeCheck = true;
                }else{
                    typeCheck = false;
                }
            }
        }
        return (textMatch || lastNameMatch || fullNameMatch || emailMatch) && typeCheck;
    });
}

export default getVisibleUsers;