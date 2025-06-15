import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userService = {
    // Метод за извличане на всички потребители
    async getAllUsers() {
        return await User.find();
    },

    // Метод за регистриране на нов потребител
    async register(username, email, password) {
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            throw new Error('Username already exists');
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            throw new Error('Email already exists');
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        const savedUser = await user.save();

        const userWithoutPassword = savedUser.toObject();
        delete userWithoutPassword.password;

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
        );

        userWithoutPassword.token = token;

        return userWithoutPassword;
    },

    // Метод за логване на потребител
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
        );

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return { token, username: userWithoutPassword.username, id:userWithoutPassword._id, isAdmin:userWithoutPassword.isAdmin, isModerator:userWithoutPassword.isModerator  };
    },

    // Метод за извличане на един потребител посредсвтом неговото id
    async getUserById(id) {
        const user = await User.findById(id).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },

    // Метод за актуализиране на един потребител
    async updateUser(id, data) {
        const user = await User.findById(id);

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
            throw new Error("Wrong password")
        }

        user.username = data.username;
        user.email = data.email;


        await user.save();
        return { username: user.username, email: user.email };
    },

    async updateUserAdmin(id,data){
        const user = await User.findById(id);

        user.username = data.username;
        user.email = data.email;

        await user.save();
        return { username: user.username, email: user.email };
    },

    // Метод за актуализиране на паролата на един потребител
    async updatePassword(id, oldPassword, newPassword) {
        const user = await User.findById(id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            throw new Error("Wrong password")
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return { message: 'Password updated successfully' };
    },

    // Метод за актуализиране на имейл на един потребител
    async updateEmail(id, password, newEmail) {
        const user = await User.findById(id);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Wrong password")
        }

        user.email = newEmail;
        await user.save();
        return { message: 'Email updated successfully' };
    },

    // Метод за актуализиране на username-ма на един потребител
    async updateUsername(id, password, newUsername) {
        const user = await User.findById(id);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Wrong password")
        }

        user.username = newUsername;
        await user.save();
        return { message: 'Username updated successfully' };
    },


    // Метод за изтриване на един потребител

    async deleteProfile(userId, password) {
        try {
            const user = await User.findById(userId);

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return { message: "Wrong password" }
            }

            await User.findByIdAndDelete(userId);

            if (!user) {
                throw new Error("User not found");
            }

            return { message: "success" }
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    },


    // Метод за промотиране на нормален потребител към модератор

    async promoteToModerator(userId) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');
        if (user.isModerator) throw new Error('User is already a moderator');

        user.isModerator = true;
        await user.save();
        return { message: 'User promoted to moderator' };
    },

    // Метод за махане на роля модератор

    async demoteFromModerator(userId) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');
        if (!user.isModerator) throw new Error('User is not a moderator');

        user.isModerator = false;
        await user.save();
        return { message: 'User demoted from moderator' };
    }
};

export default userService;