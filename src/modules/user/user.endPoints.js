import { systemRoles } from "../../utils/systemRoles.js";
export const userRoles = {
    CREAT_USER: [systemRoles.ADMIN],
    DELETE_USER: [systemRoles.ADMIN],
    ALL_USERS: [systemRoles.ADMIN],
    GET_ANY_USER: [systemRoles.ADMIN],
    GET_ME: [systemRoles.USER],
    ALLRoles: [systemRoles.ADMIN, systemRoles.USER]
}