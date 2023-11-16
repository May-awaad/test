import joi from 'joi'
import { generalFields } from '../../utils/generalFilds.js'

export const addUser = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: generalFields.email,
    password: generalFields.password,
    role: joi.string().valid('User', 'Admin').required(),
    token: joi.string().required()
}).required()

export const updateUser = joi.object({
    name: joi.string().min(3).max(20).required(),
    role: joi.string().valid('User', 'Admin').required(),
    token: joi.string().required()
}).required()