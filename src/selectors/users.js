const getVisibleUsers = (users, {text,checkType}) => {
    return users.filter((user) => {
        const textMatch = user.name.toLowerCase().includes(text.toLowerCase());
        const fullNameMatch = (user.name + ' ' + user.lastName).toLowerCase().includes(text.toLowerCase());
        const emailMatch = user.email.toLowerCase().includes(text.toLowerCase());
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
        return (textMatch || fullNameMatch || emailMatch) && typeCheck;
    });
}

export default getVisibleUsers;