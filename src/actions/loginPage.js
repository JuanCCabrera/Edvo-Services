//Login Page Action Generators

/**
 *  logRegistrationStatus - Generates and object containing a user's registration status. 
 * @param {*} param0 - Object containing a user's registration status
 */
export const logRegistrationStatus = (
    {
        registered = false
    } = {}) => {
    return {
        type: 'LOG_REGISTRATION_STATUS',
        registered: registered
    }
};

/**
 *  logSubscriptionStatus - Generates and object containing a user's subscription status. 
 * @param {*} param0 - Object containing a user's subscription status
 */
export const logSubscriptionStatus = (
    {
        hasPaidSubscription = false
    } = {}) => {
    return {
    type: 'LOG_SUBSCRIPTION_STATUS',
    hasPaidSubscription: hasPaidSubscription
    }
};