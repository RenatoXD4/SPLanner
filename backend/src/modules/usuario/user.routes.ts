import { Router } from "express";

import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";

const routerUser = Router();
const userService = new UserService();
const userController = new UserController(userService);

// Rutas normales
routerUser.post("/register", userController.register.bind(userController));
routerUser.post("/login", userController.login.bind(userController));

// RUTAS DE GOOGLE OAUTH 
routerUser.get("/auth/google", userController.googleAuth.bind(userController));
routerUser.get("/auth/google/callback", userController.googleCallback.bind(userController));

// Dashboard
routerUser.get("/:userId/dashboard", userController.getDashboardStats.bind(userController));

//modificar datos del usuario
// Endpoint para verificar contraseña
routerUser.post("/:userId/verify-password", userController.verifyPassword.bind(userController));
routerUser.post("/:userId/profile", userController.updateProfile.bind(userController));

// Recuperar 
routerUser.post("/check-email", userController.checkEmail.bind(userController));
routerUser.post("/reset-password", userController.resetPassword.bind(userController));

export default routerUser;