import prisma from "../db";
import { createJWT, comparePasswords, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = "input"; // this needs to be replaced
    next(e);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  const isValid = comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({
      message:
        "User information is not found, try again after checking on input",
    });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
