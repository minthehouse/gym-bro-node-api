import prisma from "../db";
import { createJWT, comparePasswords, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: await hashPassword(req.body.password),
        password_confirmation: await hashPassword(
          req.body.password_confirmation
        ),
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        goal: true,
        gender: true,
        age: true,
        height_in_feet: true,
        height_in_inches: true,
        weight: true,
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("email_unique")) {
      // Handle duplicate email error
      return res.status(400).json({
        message:
          "Email address is already in use. Please use a different email.",
      });
    }

    // If it's not a duplicate email error, propagate the error
    error.type = "authentication_error";
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user || !(await comparePasswords(req.body.password, user.password))) {
      return send401(res);
    }

    // Exclude sensitive fields before sending the response
    const { password, password_confirmation, ...userWithoutPassword } = user;

    const token = createJWT(userWithoutPassword);
    res.json({ token, user: userWithoutPassword });
  } catch (e) {
    e.type = "authentication_error";
    next(e);
  }
};

const send401 = (res) => {
  res.status(401);
  return res.json({
    message: "User information is not found or invalid password.",
  });
};
