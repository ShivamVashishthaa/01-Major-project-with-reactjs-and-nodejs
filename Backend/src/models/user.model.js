import mongoose, { Schema } from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// we use mongoose hook (middleware) to encrypt data with the help of bcrypt

const userSchema = new mongoose.Schema(
    {
        id: {
            type: 'integer',
            required: [true, "Required"],
            unique: true
        },
        username: {
            type: String,
            required: true,
            required: [true, "Required"],
            lowercase: true,
            trim: true,
            index: true         // for searching
        },
        email: {
            type: String,
            required: [true, "Required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: [true, "Required"],
            trim: true,
            index: true         // for searching
        },
        password: {
            type: String,
            required: [true, "Required"],
        },
        avatar: {
            type: String,        //cloudinary url freely available
            required: [true, "Required"],
        },
        coverImage: {
            type: String
        },
        refreshToken: {
            type: String
        },
        watchHistroy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            }
        ]
        ,
    },
    {
        timestamps: true
    }
);

// mongoose's middleware
userSchema.pre("save", async function (next) {     // use funciton rather than arrow function beacuse arrow function don't have the context of the object.
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function () {       //jwt token

    const token = jwt.sign(
        {                                // jwt have sign method to generate token
            _id: this.id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
            avatar: this.avatar,
            coverImage: this.coverImage,
            refreshToken: this.refreshToken,
            watchHistroy: this.watchHistroy
        }
        , process.env.ACCESS_TOKEN_SECRET
        ,{
            expiresIn: ACCESS_TOKEN_EXPIRY
        });

}
userSchema.methods.generateRefreshToken = async function () {      // jwt token
    const token = jwt.sign(
        {                                // jwt have sign method to generate token
            _id: this.id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
            avatar: this.avatar,
            coverImage: this.coverImage,
            refreshToken: this.refreshToken,
            watchHistroy: this.watchHistroy
        }
        , process.env.REFRESH_TOKEN_SECRET
        ,{
            expiresIn: REFRESH_TOKEN_EXPIRY
        });
}        

export const User = mongoose.model('User', userSchema);