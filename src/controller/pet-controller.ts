// =============================================================================
// PASSO 4 — Controller: a camada que lida com HTTP (requisição e resposta)
// =============================================================================
// O controller é a ponte entre o mundo HTTP (req/res) e o service.
// Ele NÃO acessa o banco: apenas lê dados da requisição (req.body, req.params),
// chama o service e devolve a resposta com o STATUS HTTP correto.
// =============================================================================

import { Request, Response } from "express";          // tipos da requisição/resposta
import { ObjectId } from "mongodb";                    // para converter o id (texto) do Mongo
import { petService } from "../service/pet-service";   // PASSO 3: regra + banco

class PetController {
    // GET /pets → lista todos. Status 200 = OK.
    async findAll(req: Request, res: Response) {
        res.status(200).json(await petService.findAll());
    }

    // POST /pets → cria um novo. Status 201 = Created.
    async create(req: Request, res: Response) {
        res.status(201).json(
            await petService.create(req.body)   // req.body = JSON enviado no corpo
        );
    }

    // PUT /pets/:id → atualiza pelo id. Status 200 = OK.
    async update(req: Request, res: Response) {
        const petDTO = req.body;                                  // novos dados (corpo)
        const id = new ObjectId(req.params.id?.toString());       // id vem da URL → vira ObjectId
        res.status(200).json(
            await petService.update(petDTO, id)
        );
    }

    // DELETE /pets/:id → remove pelo id. Status 204 = sucesso, sem conteúdo de volta.
    async delete(req: Request, res: Response) {
        const id = new ObjectId(req.params.id?.toString());
        await petService.delete(id);
        res.status(204).send();
    }
}

// Instância única do controller, exportada para o router usar.
const petController = new PetController();

export { petController };
