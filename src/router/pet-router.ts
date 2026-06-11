import { Router } from "express";
import { petController } from "../controller/pet-controller";

const petRouter = Router();

petRouter.get("/", petController.findAll);
petRouter.post("/", petController.create);
petRouter.put("/:id", petController.update);
petRouter.delete("/:id", petController.delete);

export { petRouter };

