const authorization = async (req, res, next) => {
    try {
        if (req.user.role == "ADMIN") {
            next();
        } else {
            throw {err: "Unauthorised! can't access this resource!"}
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            data: {},
            err: error
        });
    }
}


module.exports = authorization;