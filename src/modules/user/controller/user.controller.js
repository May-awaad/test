import userModel from "../../../../DB/models/user.js"
import cloudinary from "../../../utils/cloudinary.js"
export const addUser = async (req, res, next) => {
    const { _id } = req.user._id
    const { name, email, role, password } = req.body
    if (!req.file) {
        return next(new Error('please upload a profile image', { cause: 400 }))
    }
    const emailExist = await userModel.findOne({ email })
    if (emailExist) {
        return next(new Error('email already exist', { cause: 400 }))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
            folder: `${process.env.PROJECT_FOLDER}/users/${_id}`,
        },
    )
    const newUser = new userModel({
        name,
        email,
        image: {
            secure_url,
            public_id,
        },
        role,
        password,
    });
    const user = await newUser.save()
    if (!user) {
        await cloudinary.uploader.destroy(public_id)
        return next(
            new Error('try again later , fail to add your user', { cause: 400 }),
        )
    }
    res.status(200).json({ message: 'Added Done', user })
}

export const updateUser = async (req, res, next) => {
    const { userRole } = req.user
    const { name, role } = req.body
    let _id;
    if (userRole == "User") {
        _id = req.user._id
    } else {
        _id = req.body.userId

    }
    let user = await userModel.findOne({ _id })
    if (!user) {
        return next(new Error('invaled user Id', { cause: 400 }))
    }
    user.name = name
    user.role = role
    if (req.file) {
        let image = user.image.public_id
        const { secure_url, public_id } = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: `${process.env.PROJECT_FOLDER}/users/${_id}`,
            },
        )
        user.image = { secure_url, public_id }
        await cloudinary.uploader.destroy(image)
    }
    const newData = await userModel.findByIdAndUpdate({ _id }, user, { new: true })
    return res.status(200).json({ message: 'Updated Done', user: newData })
}

export const getAllUsers = async (req, res, next) => {
    const users = await userModel.find()
    res.status(200).json({ message: 'Done', users })
}
export const deleteUser = async (req, res, next) => {
    const { _id } = req.params
    const userExist = await userModel.findOneAndDelete({ _id })
    if (!userExist) {
        return next(new Error('invalid user id', { cause: 400 }))
    }

    //=========== Delete from cloudinary ==============
    await cloudinary.api.delete_resources_by_prefix(
        `${process.env.PROJECT_FOLDER}/users/${_id}`,
    )
    await cloudinary.api.delete_folder(
        `${process.env.PROJECT_FOLDER}/users/${_id}`,
    )

    return res.status(200).json({ messsage: 'Deleted Done' })
}

export const getAnyUser = async (req, res, next) => {
    const { _id } = req.params
    const userExist = await userModel.findOne({ _id })
    if (!userExist) {
        return next(new Error('invalid user id', { cause: 400 }))
    }
    return res.status(200).json({ messsage: 'Done', userExist })

}
export const getMyData = async (req, res, next) => {
    const { _id } = req.user
    const user = await userModel.findOne({ _id })
    return res.status(200).json({ messsage: 'Done', user })
}