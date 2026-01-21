

export const getUserData =(req, res) => {
    try {
        const role = req.user.role;
        const recentSearchCity = req.user.recentSearchCity;
        res.json({success: true, role, recentSearchCity});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}