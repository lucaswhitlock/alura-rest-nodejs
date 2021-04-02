import { Router } from "express";

import { findAllUsers, findById, createUser, loginUser, updateUser, deleteUser } from "./controllers/users";

const router = Router();

router.get("/users", findAllUsers);
router.get("/users/:id", findById)
router.post("/users", createUser);
router.post("/users/login", loginUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export { router };
