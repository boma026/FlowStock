import { Login } from "@/types/Login";
import { Register } from "@/types/Register";
import { publicApi } from "@/utils/axios";

export const userService = {
  createUser(user: Register) {
    return publicApi.post("/users", {
      email: user.email,
      password: user.password,
    });
  },

  verfyLogin(user: Login) {
    return publicApi.post("/users/login", {
      email: user.email,
      password: user.password,
    });
  },
};
