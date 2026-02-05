import { users } from "../data/users.js";

export const deleteUserService = (id) => {
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);
  return true;
};
