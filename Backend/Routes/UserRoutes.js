import express from "express";
import { createUser, getAllUsers, loginUser, getUserByUsername, updateUser, deleteUser } from "../Controllers/UserController.js";
const router = express.Router()

router.route('/').post(createUser).get(getAllUsers);
router.post('/login', loginUser);
router.get('/:username', getUserByUsername);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

export default router;