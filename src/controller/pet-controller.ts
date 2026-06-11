import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { petService } from "../service/pet-service";

class PetController {
    async findAll(req: Request, res: Response) {
        res.status(200).json(await petService.findAll());
    }

    async create(req: Request, res: Response) {
        res.status(201).json(
            await petService.create(req.body)
        );
    }

    async update(req: Request, res: Response) {
        const petDTO = req.body;
        const id = new ObjectId(req.params.id?.toString());
        res.status(200).json(
            await petService.update(petDTO, id)
        );
    }

    async delete(req: Request, res: Response) {
        const id = new ObjectId(req.params.id?.toString());
        await petService.delete(id);
        res.status(204).send();
    }
}

const petController = new PetController();

export { petController };

