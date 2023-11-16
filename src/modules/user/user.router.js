import { Router } from 'express'
import { multerFunction } from '../../utils/multerCloud.js'
import { allowedExtensions } from '../../utils/allowedExtensions.js'
import { asyncHandler } from '../../utils/errorHandling.js'
import * as userConteroller from './controller/user.controller.js'
import { validation } from '../../middleware/validation.js'
import * as validators from './user.validation.js'
import { auth } from '../../middleware/auth.js'
import { userRoles } from './user.endPoints.js'

const router = Router()
router.post(
    '/addUser',
    auth(userRoles.CREAT_USER),
    multerFunction(allowedExtensions.Image).single('image'),
    validation(validators.addUser),
    asyncHandler(userConteroller.addUser),
)

router.patch(
    '/updateUser',
    auth(userRoles.ALLRoles),
    multerFunction(allowedExtensions.Image).single('image'),
    validation(validators.updateUser),
    asyncHandler(userConteroller.updateUser),
)

router.get('/', auth(userRoles.ALL_USERS), asyncHandler(userConteroller.getAllUsers))

router.delete(
    '/deleteUser/:_id',
    auth(userRoles.DELETE_USER),
    asyncHandler(userConteroller.deleteUser),
)

router.get(
    '/getAnyUser/:_id',
    auth(userRoles.GET_ANY_USER),
    asyncHandler(userConteroller.getAnyUser),
)

router.get(
    '/getMyData',
    auth(userRoles.GET_ME),
    asyncHandler(userConteroller.getMyData),
)
export default router