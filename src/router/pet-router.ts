// =============================================================================
// PASSO 5 — Router: mapeia URL + método HTTP → função do controller
// =============================================================================
// O router é a "tabela de endereços". Para cada combinação de método HTTP
// (GET, POST, PUT, DELETE) e caminho, ele diz QUAL função do controller chamar.
// Obs.: o prefixo "/pets" NÃO está aqui — ele é adicionado no server.ts (Passo 6).
// =============================================================================

import { Router } from "express";                          // cria um agrupador de rotas
import { petController } from "../controller/pet-controller"; // PASSO 4: as funções HTTP

const petRouter = Router();

petRouter.get("/", petController.findAll);     // GET    /pets       → listar todos
petRouter.post("/", petController.create);     // POST   /pets       → criar
petRouter.put("/:id", petController.update);   // PUT    /pets/:id   → atualizar (:id = parâmetro)
petRouter.delete("/:id", petController.delete);// DELETE /pets/:id   → remover

export { petRouter };
