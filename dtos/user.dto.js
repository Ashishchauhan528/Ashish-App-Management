export const userDTO = (data) => {
  return {
    name: data.name?.trim(),
    email: data.email?.toLowerCase().trim(),
  };
};
