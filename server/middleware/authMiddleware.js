
import user from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const { userId } = req.auth;
        if(!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No user ID provided' });
        }else {
            const newuser = await user.findById(userId);
            req.user = newuser;
            next();
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
}