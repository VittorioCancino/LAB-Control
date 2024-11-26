import type { Request, Response } from "express";
import User from "../models/User.model";

// EXTERNAL INTERFACES
import { RoleSchema } from "./Role.Controller";
import { CareerSchema } from "./Career.Controller";

// INTERFACES
interface UserSchema {
    Id: number
    Rut: string
    Name: string
    LastName: string
    Email: string
    Career: number
    Role: number
}

interface CreateUserSchema {
    Rut: string
    Name: string
    LastName: string
    Email: string
    Career: string
    Role: string

}

interface RemoveUserSchema {
    Rut: string
    Email: string
    Name: string
    LastName: string
}

interface UpdateUserSchema {
    Rut: string
    Email: string
    Name: string
    LastName: string
    Role: string
    Career: string
}

interface UpdateCastSchema {
    Career: number,
    Role: number
}

// EXTERNAL FUNCTIONS
import { CheckRole, FindRole } from "./Role.Controller";
import { CheckCareer, FindCareer } from "./Career.Controller";
import Role from "../models/Role.model";
import Career from "../models/Career.model";

export class UserController {
    // Admin Controller Functions
    // User Creation Function
    static CreateUser = async (req: Request, res: Response) => {
        try {

            // Structure The Request Schema
            const Request: CreateUserSchema = req.body

            // Start Checking
            // User Check
            // First we look if the Creating User alredy Exists
            // We asume that emails are Unique per user
            const UserExistsByEmail: UserSchema = await User.findOne({ where: { Email: Request.Email } });

            // Throw error if the user alredy exists 
            if (UserExistsByEmail != null) {
                res.status(409).send({
                    error: "Error Code 409 (Conflict): 'User Alredy Exists'"
                })
                return
            }

            // We asume that emails are Unique per user
            const UserExistsByRut: UserSchema = await User.findOne({ where: { Rut: Request.Rut } });

            // Throw error if the user alredy exists 
            if (UserExistsByRut != null) {
                res.status(409).send({
                    error: "Error Code 409 (Conflict): 'User Alredy Exists'"
                })
                return
            }

            // Role Check 
            const RoleList: RoleSchema[] = await Role.findAll(({ raw: true, attributes: { exclude: ["CreatedAt", "UpdatedAt"] } }))
            if (!CheckRole(Request.Role, RoleList)) {
                res.status(422).send({
                    error: `Error Code 422 (Unprocessable Entity): 'Field Rol' The field ${Request.Role} entered in the Role attribute does not exist among the accepted options.`
                })
                return
            }

            // Career Check
            const CareerList: CareerSchema[] = await Career.findAll(({ raw: true, attributes: { exclude: ["CreatedAt", "UpdatedAt"] } }))
            if (!CheckCareer(Request.Career, CareerList)) {
                res.status(422).send({
                    error: `Error Code 422 (Unprocessable Entity): 'Field Career' The field ${Request.Career} entered in the Career attribute does not exist among the accepted options.`
                })
                return
            }
            // End Checking 
            // Create the new User 
            const newUser = new User();
            // Rut
            newUser.Rut = Request.Rut
            // Name
            newUser.Name = Request.Name
            // LastName
            newUser.LastName = Request.LastName
            // Email
            newUser.Email = Request.Email


            // Add the Role
            newUser.Role = FindRole(Request.Role, RoleList).Id
            // Add the Career 
            newUser.Career = FindCareer(Request.Career, CareerList).Id

            console.log(newUser)
            // Save the New User in the Database
            await Promise.allSettled([newUser.save()])

            // Send the Successfull Response
            res.status(200).send({ message: "User Successfully Registered" })

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        };
    };

    // Remove User Function
    static RemoveUser = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: RemoveUserSchema = req.body

            // Start Checking
            // User Check
            const UserExists: UserSchema = await User.findOne({ where: { Email: Request.Email } });

            // Throw error if the user alredy exists 
            if (!UserExists) {
                res.status(409).send({
                    error: "Error Code 409 (Conflict): 'User does not exist'"
                })
                return
            }
            // Stop Checking

            // Find the User to remove
            const UserRemove: UserSchema = await User.findOne({ where: { Email: Request.Email } })

            // Remove the User from the Database
            await Promise.allSettled([User.destroy({ where: { Id: UserRemove.Id } })])

            res.status(200).send({
                message: "User Successfully removed"
            })

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        };
    };

    // Get Users Data
    static GetAllUsers = async (req: Request, res: Response) => {
        try {
            // We dont need to structure the Request this is a get Method
            // Retrieve users information
            const UsersList: UserSchema[] = await User.findAll({ raw: true, attributes: { exclude: ["CreatedAt", "UpdatedAt"] } })
            res.status(200).send({ message: "Users Data Queried Successfully", data: UsersList })
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        };
    };

    // Update User Information Functionreturn 0;
    static UpdateUser = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: UpdateUserSchema = req.body

            // Start checking
            // Check if the User Exist
            const UserExists: UserSchema = await User.findOne({ where: { Email: Request.Email } });

            // Throw error if the user alredy exists 
            if (!UserExists) {
                res.status(409).send({
                    error: "Error Code 409 (Conflict): 'User does not exist'"
                })
                return
            }

            // Check if the Request Career Exists, in case it brings it
            if (Request.Career != undefined && Request.Career != null) {
                const CareerList: CareerSchema[] = await Career.findAll({ raw: true, attributes: { exclude: ["CreatedAt", "UpdatedAt"] } })
                const CareerExists = CheckCareer(Request.Career, CareerList)

                // If the Career does not exists
                if (!CareerExists) {
                    res.status(409).send({
                        error: "Error Code 409 (Conflict): 'Career does not exist'"
                    })
                    return
                }
            }

            // Check if the Request Role Exists, in case it brings it
            if (Request.Role != undefined && Request.Role != null) {
                const RoleList: RoleSchema[] = await Role.findAll({ raw: true, attributes: { exclude: ["CreatedAt", "UpdatedAt"] } })
                const RoleExists = CheckCareer(Request.Role, RoleList)
                // If the Role does not exists
                if (!RoleExists) {
                    res.status(409).send({
                        error: "Error Code 409 (Conflict): 'Role does not exist'"
                    })
                    return
                }
            }

            // End checking
            // Retrieve the existing user
            const ExistingUser = await User.findOne({ where: { Email: Request.Email } })

            // We need to update this values so we need UpdateCast not to be a const variable
            let UpdateCast: UpdateCastSchema = {
                Career: 0,
                Role: 0
            }

            // Get the Id of the new Career and Role if the request brings them
            // by default we set the previous values of the existing users to the Cast
            UpdateCast.Career = ExistingUser.Career
            UpdateCast.Role = ExistingUser.Role

            // Check if the Request Career Exists, in case it brings it
            // If the Career exists, the retrieve his Id
            if (Request.Career != undefined && Request.Career != null) {
                const CareerList: CareerSchema[] = await Career.findAll({ raw: true, attributes: { exclude: ["CreatedAt", "UpdatedAt"] } })
                const CareerExists: CareerSchema = FindCareer(Request.Career, CareerList)

                // If the Career does not exists
                if (!CareerExists) {
                    res.status(409).send({
                        error: "Error Code 409 (Conflict): 'Career does not exist'"
                    })
                    return
                }
                // Set the new Career
                UpdateCast.Career = CareerExists.Id
            }

            // If the Role exists, the retrieve his Id
            if (Request.Role != undefined && Request.Role != null) {
                const RoleList: RoleSchema[] = await Role.findAll({ raw: true, attributes: { exclude: ["CreatedAt", "UpdatedAt"] } })
                const RoleExists: RoleSchema = FindCareer(Request.Role, RoleList)

                // If the Role does not exists
                if (!RoleExists) {
                    res.status(409).send({
                        error: "Error Code 409 (Conflict): 'Role does not exist'"
                    })
                    return
                }
                // Set the new Role
                UpdateCast.Role = RoleExists.Id
            }

            await User.update({
                Rut: Request.Rut,
                Name: Request.Name,
                LastName: Request.LastName,
                Email: Request.Email,
                Career: UpdateCast.Career,
                Role: UpdateCast.Role
            }, { where: { Id: ExistingUser.Id } })

            res.status(200).send({ message: "User Successfully Updated" })

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: "Internal Server Error" });
        };
    };

};