import { Router } from "express";

import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";

const routerUser = Router();
const userService = new UserService();
const userController = new UserController(userService);

routerUser.post("/register", userController.register.bind(userController));
routerUser.post("/login", userController.login.bind(userController));

export default routerUser;