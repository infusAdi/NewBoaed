import { useSelector } from "react-redux";

export function usePermission(modules) {
  const rolesDetails = useSelector((state) => state.common.roleDetails);
  if (rolesDetails) {
    let moduleRoles = rolesDetails.find(
      (f) => f.NavigationMenu.MenuRouteName === `${modules}`
    );

    return moduleRoles;
  } else {
    return {};
  }
}
