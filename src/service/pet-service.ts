import { ObjectId } from "mongodb";
import Mongo from "../db/mongo";
import { PetDTO } from "../dto/pet-dto";

class PetService {
    async findAll() {
        const conn = await Mongo.getInstance();
        const db = conn.db("devweb");
        const pets = db.collection("pets");
        return await pets.find().toArray();
    }

    async create(petDTO: PetDTO) {
        const conn = await Mongo.getInstance();
        const db = conn.db("devweb");
        const pets = db.collection("pets");
        await pets.insertOne(petDTO);
        return petDTO;
    }

    async update(petDTO: PetDTO, id: ObjectId) {
        const conn = await Mongo.getInstance();
        const db = conn.db("devweb");
        const pets = db.collection("pets");
        const result = await pets.updateOne({ _id: id }, { $set: petDTO });

        if (result.matchedCount == 0) {
            throw {
                status: 404,
                message: "Não existe pet com esse id."
            }
        }

        return petDTO;
    }

    async delete(id: ObjectId) {
        const conn = await Mongo.getInstance();
        const db = conn.db("devweb");
        const pets = db.collection("pets");
        const result = await pets.deleteOne({ _id: id });

        if (result.deletedCount == 0) {
            throw {
                status: 404,
                message: "Não existe pet com esse id."
            };
        }
    }
}

const petService = new PetService();

export { petService };

