import { User } from '../Models/User.model.js';

export const appendProductToUser = async (userId, productId) => {
    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        // Append productId to the user's products array
        user.products.push(productId);
        // Save the updated user document
        await user.save();

        return { success: true, message: 'Product ID appended to user successfully' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const deleteProductFromUser = async (userId, productId) => {
    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        // Remove productId from the user's products array
        user.products = user.products.filter(prodId => prodId.toString() !== productId.toString());
        // Save the updated user document
        await user.save();

        return { success: true, message: 'Product ID deleted from user successfully' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
