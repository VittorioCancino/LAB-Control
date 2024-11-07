import type { Request, Response } from "express";
import User from "../models/User.model";

// Interface the data structure for CreateUser Request
interface CreateUserRequest {
    Rut: string
    Name: string
    UserLastName: string
    Email: string
    Career: string
    Role: string

}


function ValidateRut(Rut: string): string {
    return `Validation`
}

function ValidateWord(Word: string, WordsList: string[]): boolean {
    // Convert the search word to lowercase
    const lowerCaseWord = Word.toLowerCase();

    // Check if the word exists in the array (ignoring case)
    return WordsList.some(item => item.toLowerCase() === lowerCaseWord);
}



// Defining the Admin Controller
// TODO Finish the Controller
export class AdminController {
    // Defining Admin Controller Functions
    // User Creation Function
    static CreateUser = async (req: Request, res: Response) => {
        try {

            req.body as CreateUserRequest
            console.log("Creating User with: ", req.body);
            const user_exists = await User.findOne({ where: { Email: req.body.Email } });

            console.log("Search Result for the User: ", user_exists);

            if (user_exists != null) {
                console.log("User Alredy Exists")
                res.status(409).send({
                    error: "Error Code 409 (Conflict): 'User Alredy Exists'"
                })
                return

            }

            // TODO Validate User Rut
            // Call ValidateRut Function



            // Function ValidateWord returns 
            // true if the Word is in WordsList
            // false if the Role is not in WordsList

            // Validate User Role
            const UserRols: string[] = ["Ayudante", "Admin", "Externo"];
            if (!ValidateWord(req.body.Role, UserRols)) {
                console.log(`User ${req.body.Role} is does not exist`)
                res.status(422).send({
                    error: `Error Code 422 (Unprocessable Entity): 'Field Rol' The field ${req.body.Role} entered in the Role attribute does not exist among the accepted options.`
                })
                return
            }

            // Validate User Career
            const UserCareers: string[] = ["Civil", "Comercial", "Informatica"]
            if (!ValidateWord(req.body.Career, UserCareers)) {
                console.log(`User Career "${req.body.Career}" is does not exist`)
                res.status(422).send({
                    error: `Error Code 422 (Unprocessable Entity): 'Field Career' The field ${req.body.Career} entered in the Career attribute does not exist among the accepted options.`
                })
                return
            }

            // Create User and Aggregate it to the Database
            const newUser = new User();
            // Add the RUT
            newUser.Rut = req.body.Rut
            // Add the Name
            newUser.Name = req.body.Name
            // Add the LastName
            newUser.LastName = req.body.LastName
            // Add the Email
            newUser.Email = req.body.Email
            // Add the Role
            newUser.Role = req.body.Role
            await Promise.allSettled([newUser.save()])

            // Send the Successfull Response
            res.status(200).send({
                message: "User Successfully Registered"
            })
            return

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
        };
    };

    // Update User Information Function
    static UpdateUser = async (req: Request, res: Response) => {
        try {

        } catch (error) {

        };
    };

    // Delete User Function
    static DeleteUser = async (req: Request, res: Response) => {
        try {

        } catch (error) {

        };
    };

    // Retrieve User Information Function
    static GetUserData = async (req: Request, res: Response) => {
        try {

        } catch (error) {

        };
    };

    static GetActiveUsers = async (req: Request, res: Response) => {
        try {

        } catch (error) {

        };
    };

    static Login = async (req: Request, res: Response) => {
        try {
            console.log("Hay conexión")

        } catch (error) {

        };
    };

};