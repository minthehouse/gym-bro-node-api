import express from "express";
import router from "./router";
import moragn from "morgan";
import cors from "cors";
import { createNewUser, signin } from "./handlers/user";
import { protect } from "./modules/auth";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const app = express();

// order matters.
// put middleware first (morgan) to put it for everything.

app.use(cors()); // allows you to prevent different IP addresses, different Request to have specific headers, or different type of method but doesn't tell you who the person is. typically called a pre-flight check
app.use(moragn("dev")); // I'm using this middleware called morgan for the entire app.
app.use(express.json()); // It allows client to send json.
app.use(express.urlencoded({ extended: true })); // It allows client to send query strings, and it does endcode and decode automatically.

app.get("/", (req, res, next) => {
  res.json({ message: "Hi" });
});

// app.use("/api", protect, router);
app.use("/api", protect, router);

const confirmPasswordMatches = (value, { req }) => {
  console.log("hit hit hit ", value === req.body.password);
  return value === req.body.password;
};

app.post(
  "/user",
  body("first_name").isString().notEmpty(),
  body("last_name").isString().notEmpty(),
  body("email").isEmail(),
  body("password").isStrongPassword(),
  body("password_confirmation").custom(confirmPasswordMatches),
  handleInputErrors,
  createNewUser
);

app.post(
  "/signin",
  body("email").isEmail(),
  body("password").isStrongPassword(),
  handleInputErrors,
  signin
);

// error handler needs to be placed at the bottom after all the routes are set.
// so that they can be caught by the error handlers
// app.use((err, req, res, next) => {
//   if (err.type === "auth") {
//     res.status(401).json({ message: "Unauthorized" });
//   } else if (err.type === "input") {
//     res.status(400).json({ message: "Invalid input" });
//   } else {
//     res.status(500).json({ message: "Oops, that is on us" });
//   }
// });

export default app;
