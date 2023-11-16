import { mongoose, Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'User',
            enum: ['User', 'Admin']
        },
        image: {
            secure_url: String,
            public_id: String,
        },
    },
    {
        timestamps: true,
    }
);
userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.saltRound))
})
const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;