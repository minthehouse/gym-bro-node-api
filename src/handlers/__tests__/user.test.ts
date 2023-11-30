import * as user from "../user";

describe("User handler", () => {
  it("should create a new user", async () => {
    const req = {
      body: {
        username: "hello",
        password: "hi",
      },
    };
    const res = {
      json(token) {
        console.log("token", token);
        expect(token).toBeTruthy();
      },
    };
    const newUser = await user.createNewUser(req, res, () => {});
  });
});
