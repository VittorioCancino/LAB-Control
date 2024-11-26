import type { Request, Response } from "express";
import Role from "../models/Role.model";

// INTERFACES
export interface RoleSchema {
    Id: number,
    Description: string
}

interface CreateRoleSchema {
    Description: string
}

interface RemoveRoleSchema {
    Description: string
}

// FUNCTIONS
export function CheckRole(Description: string, RoleList: RoleSchema[]) {
    return RoleList.some(role => role.Description.toLocaleLowerCase() === Description.toLocaleLowerCase())
}

export function FindRole(Description: string, RoleList: RoleSchema[]) {
    return RoleList.find(role => role.Description.toLocaleLowerCase() === Description.toLocaleLowerCase())
}

export class RoleController {
    // Role Controller Functions

    // Create Role
    static CreateRole = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: CreateRoleSchema = req.body

            // Start Checking
            // Retrive the Roles list
            const RoleList = await Role.findAll({ raw: true })

            // Check if the Role alredy exists
            const RoleExsits = CheckRole(Request.Description, RoleList)

            // Throw Error if the Role alredy exists
            if (RoleExsits) {
                res.status(400).send({ error: "The Role alredy exists" })
                return
            }
            // End Checking

            // Now we create the new Role
            const NewRole = new Role()
            NewRole.Description = Request.Description

            // Add the Role to the Database
            await Promise.allSettled([NewRole.save()])
            res.status(200).send({ message: "Role Successfully created" })

        } catch (error) {
            console.log(error)
            res.status(400).send({ error: "Internal Server Error" })
        }
    }


    static RemoveRole = async (req: Request, res: Response) => {
        try {
            // Structure the Requset
            const Request: RemoveRoleSchema = req.body

            // Start Checking
            // Retrive the Careers list
            const RoleList: RoleSchema[] = await Role.findAll({ raw: true })

            // Check if the Role  exists
            const RoleExists: boolean = CheckRole(Request.Description, RoleList)

            // Throw Error if the Role does not exists
            if (!RoleExists) {
                res.status(400).send({ error: "The Role does not Exist" })
                return
            }
            // End Checking

            // We retrive the Existing Role
            const RemoveRole: RoleSchema = FindRole(Request.Description, RoleList)

            // Remove the Role from the Database
            await Promise.allSettled([Role.destroy({ where: { Id: RemoveRole.Id } })])
            res.status(200).send({ message: "Role Successfully Removed" })

        } catch (error) {
            console.log(error)
            res.status(400).send({ error: "Internal Server Error" })
        }
    }

    static GetAllRoles = async (req: Request, res: Response) => {
        try {
            // There is no Request Schema to Structure this is a Get Method

            // Retrieve all the Careers, we want to exclude the updatedat and createat fields
            const RoleList: RoleSchema[] = await Role.findAll({ raw: true, attributes: { exclude: ["CreatedAt, UpdatedAt"] } })
            res.status(200).send({
                message: "Careers data Queried Successfully",
                data: RoleList
            })

        } catch (error) {
            console.log(error)
            res.status(400).send({ error: "Internal Server Error" })
        }
    }
}