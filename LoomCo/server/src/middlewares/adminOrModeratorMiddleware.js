export const adminOrModeratorMiddleware = (req, res, next) => {
    const user = req.user;

    if (!user?.isAdmin && !user?.isModerator) {
        return res.status(403).json({ message: 'Admin or Moderator access required' });
    }

    next();
};

export default adminOrModeratorMiddleware;