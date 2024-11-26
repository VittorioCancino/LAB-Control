import { Router } from "express";
import { HandleInputErros } from "../middleware";
import { RoleController } from "../controllers/Role.Controller";


const RouterRole = Router();

RouterRole.post(
    "/create-role",
    HandleInputErros,
    RoleController.CreateRole
)

RouterRole.post(
    "/remove-role",
    HandleInputErros,
    RoleController.RemoveRole
)

RouterRole.get(
    "/get-all-roles",
    HandleInputErros,
    RoleController.GetAllRoles
)

export default RouterRole;