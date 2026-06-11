// =============================================================================
// PASSO 3 — Service: regra de negócio + acesso ao banco
// =============================================================================
// O service é o "cérebro": é a única camada que fala com o banco e onde ficam
// as validações/regras. Cada método corresponde a uma operação do CRUD
// (Create, Read, Update, Delete). O controller chama estes métodos.
// =============================================================================

import { ObjectId } from "mongodb";        // tipo especial usado pelo _id do Mongo
import Mongo from "../db/mongo";            // PASSO 1: conexão com o banco
import { PetDTO } from "../dto/pet-dto";    // PASSO 2: formato dos dados

class PetService {
    // READ — listar todos os pets
    async findAll() {
        const conn = await Mongo.getInstance();   // pega a conexão (Passo 1)
        const db = conn.db("devweb");             // escolhe o BANCO "devweb"
        const pets = db.collection("pets");       // escolhe a COLEÇÃO "pets"
        return await pets.find().toArray();       // busca todos e transforma em array
    }

    // CREATE — inserir um novo pet
    async create(petDTO: PetDTO) {
        const conn = await Mongo.getInstance();
        const db = conn.db("devweb");
        const pets = db.collection("pets");
        await pets.insertOne(petDTO);             // insere o documento no banco
        return petDTO;                            // devolve o que foi criado
    }

    // UPDATE — atualizar um pet pelo id
    async update(petDTO: PetDTO, id: ObjectId) {
        const conn = await Mongo.getInstance();
        const db = conn.db("devweb");
        const pets = db.collection("pets");
        // Procura pelo _id e substitui os campos com os novos valores ($set).
        const result = await pets.updateOne({ _id: id }, { $set: petDTO });

        // Se matchedCount == 0, NENHUM documento tinha esse id → erro 404.
        if (result.matchedCount == 0) {
            throw {
                status: 404,
                message: "Não existe pet com esse id."
            }
        }

        return petDTO;
    }

    // DELETE — remover um pet pelo id
    async delete(id: ObjectId) {
        const conn = await Mongo.getInstance();
        const db = conn.db("devweb");
        const pets = db.collection("pets");
        const result = await pets.deleteOne({ _id: id });   // apaga pelo _id

        // Se deletedCount == 0, nada foi apagado (id não existia) → erro 404.
        if (result.deletedCount == 0) {
            throw {
                status: 404,
                message: "Não existe pet com esse id."
            };
        }
    }
}

// Cria uma instância única do service e a exporta (assim o controller reusa a mesma).
const petService = new PetService();

export { petService };
