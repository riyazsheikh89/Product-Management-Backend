const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, JWT_EXPIRY } = require("../config/env-config");

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'MEMBER'],
        default: "MEMBER"
    }
}, {timestamps: true});


// Coverting plain password into encrypted password
candidateSchema.pre("save", function(next) {
    const SALT = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(this.password, SALT);
    this.password = encryptedPassword;
    next();
});


// Compare plain text password with encrypted password
candidateSchema.methods.comparePassword = function compare(plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password);
    // returns true if both the paswords matches 
}


// Generate JWT token for user authentication
candidateSchema.methods.generateToken = function createJwtToken() {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role,
    }, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRY});
    return token;
}


const User = mongoose.model("User", candidateSchema);

module.exports = User;