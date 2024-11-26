import { Router } from "express";
import { HandleInputErros } from "../middleware";
import { CareerController } from "../controllers/Career.Controller";


const RouterCareer = Router();

RouterCareer.post(
    "/create-career",
    HandleInputErros,
    CareerController.CreateCareer
)

RouterCareer.post(
    "/remove-career",
    HandleInputErros,
    CareerController.RemoveCareer
)

RouterCareer.get(
    "/get-all-careers",
    HandleInputErros,
    CareerController.GetAllCareers
)



export default RouterCareer;