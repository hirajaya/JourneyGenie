import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        match: [/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Phone number must contain exactly 10 digits'],
    },
    age: {
        type: Number,
        required: true,
        min: [0, 'Age must be a positive number'],
        max: [100, 'Age must be realistic'],
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
    },
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: 'Date of birth cannot be in the future'
        }
    },
    address: {
        type: String,
        required: true,
        minlength: [5, 'Address must be at least 5 characters long'],
        maxlength: [255, 'Address is too long']
    },
    province: {
        type: String,
        required: true,
        enum: [
            'Central', 'Eastern', 'Northern', 'Southern', 'Western',
            'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
        ],
    },
    profilePicture: {
        type: String,
        default: '',
        match: [/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/, 'Profile picture must be a valid image URL'],
    },
    username: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 7,
        match: [/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{7}$/, 'Username must be exactly 7 characters long and contain at least 2 digits'],
    },
    password: {
        type: String,
        required: true,
        minlength: 7, 
        maxlength: 100,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
}, 
{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;