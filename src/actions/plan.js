//Plan Action Generators

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