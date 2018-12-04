//Login Page Action Generators

/**
 *  logRegistrationStatus - Generates and object containing a user's registration status. 
 * @param {*} param0 - Object containing a user's registration status in the form of a "registered" key which expects a boolean 
 * indicating whether the user is registered (true) or not (false). 
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
 * @param {*} param0 - Object containing hasPaidSubscription key which expects a boolean indincating
 *  whether the user has an active subscription (true) or not (false). 
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