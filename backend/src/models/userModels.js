const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        required: true,
        enum: ["admin", "manager", "user"],
    },
},
    {
        timestamps: true,
    }
);