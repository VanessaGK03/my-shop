import { Router } from 'express';
import userService from '../services/userService.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userController = Router();

// GET /api/users
userController.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
});

// GET /api/users/:id
userController.get('/:id', async (req, res) => {    
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// POST /api/users/register
userController.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await userService.register(username, email, password);
        res.status(201).json(user);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// POST /api/users/login
userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await userService.login(email, password);
        res.json(result);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// PUT /api/users/:id
userController.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err.message });
    }
});

userController.put('/admin/:id', authMiddleware, async (req, res) => {
    try {
        const updatedUser = await userService.updateUserAdmin(req.params.id, req.body);
        res.json(updatedUser);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// PUT /api/users/:id/password
userController.put('/:id/password', authMiddleware, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const result = await userService.updatePassword(req.params.id, oldPassword, newPassword);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/users/:id/email
userController.put('/:id/email', authMiddleware, async (req, res) => {
    const { password, newEmail } = req.body;

    try {
        const result = await userService.updateEmail(req.params.id, password, newEmail);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/users/:id/username
userController.put('/:id/username', authMiddleware, async (req, res) => {
    const { password, newUsername } = req.body;

    try {
        const result = await userService.updateUsername(req.params.id, password, newUsername);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/users/:id
userController.delete('/:id', authMiddleware, async (req, res) => {
    const { password } = req.body;

    try {
        const result = await userService.deleteProfile(req.params.id, password);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

userController.put('/:id/promote', authMiddleware, async (req, res) => {
    try {
        const updated = await userService.promoteToModerator(req.params.id);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

userController.put('/:id/demote', authMiddleware, async (req, res) => {
    try {
        const updated = await userService.demoteFromModerator(req.params.id);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default userController;
