const User = require("../models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const response = await User.create(
            { name, email, password, role }
        );
        return res.status(201).json({
            success: true,
            message: "Successfuly registerd new user",
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Successfuly registerd new user",
            data: {},
            err: error
        });
    }
}

module.exports = {
    signup,
}