const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_EXPIRED } = require('../constant');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const bcryptPassword = await bcrypt.hash(password, 14);
        const newUser = await User.create({
            name,
            email,
            password: bcryptPassword,
            role
        });
        res.status(201).json({
            status: true,
            message: "User Created Successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "User Registration Failed",
            error,
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                success: false,
                message: "Invaild email or password"
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: JWT_EXPIRED,
        })
        res.status(200).json({
            success: true,
            message: "User Login Successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            },
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "User Login Failed",
            error,
        });
    }
}

module.exports = { registerUser, loginUser }