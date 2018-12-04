//Plan Action Generators

/**
 * loadPlan - Generates an object containing a user's name and status so that their plan information can be loaded in the Teacher Settings page. 
 * @param {*} param0 - Object containing a user's name and status. The status of the user can be 'active' or 'suspended'. 
 */
export const loadPlan = (
    {
        name = '',
        status = ''
    } = {}) => {
    return {
    type: 'LOAD_PLAN',
        plan: {
            name: name,
            status: status
        }
    }
};