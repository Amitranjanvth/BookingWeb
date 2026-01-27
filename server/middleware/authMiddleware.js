
import User from '../models/user.js';

export const protect = async (req, res, next) => {
    try {
        const { userId } = req.auth;
        if(!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No user ID provided' });
        }else {
            const newuser = await User.findById(userId);
            req.user = newuser;
            next();
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
}