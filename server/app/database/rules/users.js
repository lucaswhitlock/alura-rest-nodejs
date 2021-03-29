import { Invalid, Duplicity } from "../../config/error/error";
const validateUser = async (user, database) => {

  let isValid = true;

  if (!user.name)
    throw new Invalid("name");

  if (!user.birth)
    throw new Invalid("birth");

  if (!user.login)
    throw new Invalid("login");

  if (!user.password)
    throw new Invalid("password");

  let count = await database.users.count({ where: { login: user.login } });
  if (count > 0)
    throw new Duplicity("login");

  return isValid;
};

export { validateUser };
