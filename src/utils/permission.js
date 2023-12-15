import store from "@/store";

/**
 * 字符权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const { value } = binding;
    const all_permission = "*:*:*"; // 全部权限
    const permissions = store.getters && store.getters.permission; // 用户拥有的权限标识的数组

    const hasPermissions = permissions.some((permission) => {
      return (
        all_permission === permission || permissionFlag.includes(permission)
      );
    });

    return hasPermissions;
  } else {
    return false;
  }
}
