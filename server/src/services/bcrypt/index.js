import { compare, genSalt, hash } from "bcrypt";

export const genHash = async (password) => {
  const salt = await genSalt(10);
  password = await hash(password, salt);
  return password;
};

export const comparePassword = async (password, existingPassword) => {
  return await compare(password, existingPassword);
};
