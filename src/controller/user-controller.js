const User = require("../models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const input = { name, email, password, role };

        // Custom Input validation
        const isValidInput = validateInputData(input);
        if (isValidInput !== "VALID_INPUT") {
            throw isValidInput;
        }

        // if the user already exist
        const user = await User.findOne({ email });
        if (user) throw "This email is already exist!"

        const response = await User.create(input);
        return res.status(201).json({
            success: true,
            message: "Successfuly registerd new user",
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to register new user!",
            data: {},
            err: error
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        // if user is not present or invalid input
        if (!user || !user.comparePassword(password)) {
            throw "You have entered incorrect email or password!";
        }

        const token = user.generateToken();
        return res.status(200).json({
            success: true,
            message: "Successfuly loged into your account",
            data: token,
            err: {}
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while login!",
            data: {},
            err: error
        });
    }
}

const userinfo = async (req, res) => {
    try {
        const data = await User.findById({ _id: req.user._id }).select("-password");
        return res.status(200).json({
            success: true,
            message: "Successfuly fetched user information",
            data,
            err: {}
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            err: error
        });
    }
}

function validateInputData(inputData) {
    if (!inputData.name || !inputData.email || !inputData.password) {
        return "All fields are mandatory!"
    }

    // Regular expression for email & password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(inputData.email)) {
        return "Enter a valid email address!";
    }
    if (!passwordRegex.test(inputData.password)) {
        return "Password must be at least 8 characters long and should contain at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character";
    }

    // if everything is okay, return success
    return "VALID_INPUT";
}


module.exports = {
    signup,
    login,
    userinfo
}