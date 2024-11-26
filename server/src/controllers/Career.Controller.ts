import type { Request, Response } from "express";
import Career from "../models/Career.model";

// INTERFACES
export interface CareerSchema {
    Id: number,
    Description: string
}

interface CreateCareerSchema {
    Description: string
}

interface RemoveCareerSchema {
    Description: string
}

// FUNCTIONS
export function CheckCareer(Description: string, CareerList: CareerSchema[]) {
    return CareerList.some(career => career.Description.toLocaleLowerCase() === Description.toLocaleLowerCase())
}

export function FindCareer(Description: string, CareerList: CareerSchema[]) {
    return CareerList.find(career => career.Description.toLocaleLowerCase() === Description.toLocaleLowerCase())
}

export class CareerController {
    // Career Controller Functions

    // Create Career
    static CreateCareer = async (req: Request, res: Response) => {
        try {
            // Structure the Request Schema
            const Request: CreateCareerSchema = req.body

            // Start Checking
            // Retrive the Careers list
            const CareerList = await Career.findAll({ raw: true })

            // Check if the Career alredy exists
            const CareerExsits = CheckCareer(Request.Description, CareerList)

            // Throw Error if the Career alredy exists
            if (CareerExsits) {
                res.status(400).send({ error: "The Career alredy exists" })
                return
            }
            // End Checking

            // Now we create the new Career
            const NewCareer = new Career()
            NewCareer.Description = Request.Description

            // Add the Career to the Database
            await Promise.allSettled([NewCareer.save()])
            res.status(200).send({ message: "Career Successfully created" })

        } catch (error) {
            console.log(error)
            res.status(400).send({ error: "Internal Server Error" })
        }
    }

    static RemoveCareer = async (req: Request, res: Response) => {
        try {
            // Structure the Requset
            const Request: RemoveCareerSchema = req.body

            // Start Checking
            // Retrive the Careers list
            const CareerList = await Career.findAll({ raw: true })

            // Check if the Career  exists
            const CareerExsits = CheckCareer(Request.Description, CareerList)

            // Throw Error if the Career does not exists
            if (!CareerExsits) {
                res.status(400).send({ error: "The Career does not Exist" })
                return
            }
            // End Checking
            // We retrive the Existing carrer
            const RemoveCareer = FindCareer(Request.Description, CareerList)

            // Remove the Career from the Database
            await Promise.allSettled([Career.destroy({ where: { Id: RemoveCareer.Id } })])
            res.status(200).send({ message: "Career Successfully Removed" })

        } catch (error) {
            console.log(error)
            res.status(400).send({ error: "Internal Server Error" })
        }
    }

    static GetAllCareers = async (req: Request, res: Response) => {
        try {
            // There is no Request Schema to Structure this is a Get Method

            // Retrieve all the Careers, we want to exclude the updatedat and createat fields
            const CareerList = await Career.findAll({ raw: true, attributes: { exclude: ["CreatedAt, UpdatedAt"] } })
            res.status(200).send({
                message: "Careers data Queried Successfully",
                data: CareerList
            })

        } catch (error) {
            console.log(error)
            res.status(400).send({ error: "Internal Server Error" })
        }
    }
}   