/*
  Verifies the rules for a role received from the embedded Can component in a render element and verifies
  them against the rbac-rules, the actions allowed for each role
*/

import rules from './rbac-rules';

//Verifies the received rule and role and returns the appropiate course of action, allow(true) or deny(false)
const check = (rules, role, action, data) => {
  const permissions = rules[role];
  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }

    return permissionCondition(data);
  }
  return false;
};

//Receives the result from the check function and allows (yes) or denies(no) the access to a component to a user
const Can = props =>
  check(rules, props.role, props.perform, props.data)
    ? props.yes()
    : props.no();

Can.defaultProps = {
  yes: () => null,
  no: () => null
};

//Component export
export default Can;
