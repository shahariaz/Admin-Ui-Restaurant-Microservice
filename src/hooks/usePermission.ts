import { User } from "../../../e-auth-service/src/entity/User";
export const usePermission = () => {
  const allowedRoles = ["admin", "manager"];
  const _hasPermission = (user: User | null) => {
    if (user) {
      return allowedRoles.includes(user.role);
    }
    return false;
  };
  return {
    isAllowed: _hasPermission,
  };
};
