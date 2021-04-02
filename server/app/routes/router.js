import { Router } from "express";

import { findAllUsers, findById, createUser, loginUser, logoutUser, updateUser, deleteUser } from "./controllers/users";
import { userBearerMiddleware } from '../routes/middlewares/auth';

const router = Router();

router.get("/users", userBearerMiddleware, findAllUsers);
router.get("/users/:id", userBearerMiddleware, findById)
router.post("/users", createUser);
router.post("/users/login", loginUser);
router.get("/users/:id/logout/", userBearerMiddleware, logoutUser);
router.put("/users/:id", userBearerMiddleware, updateUser);
router.delete("/users/:id", userBearerMiddleware, deleteUser);

export { router };
