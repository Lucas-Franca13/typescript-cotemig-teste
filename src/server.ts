// =============================================================================
// PASSO 6 — Server: monta o Express, aplica middlewares, rotas e trata erros
// =============================================================================
// Aqui o aplicativo Express é criado e configurado. É onde os middlewares
// (funções que toda requisição atravessa antes de chegar na rota) são ligados,
// onde o router é registrado e onde os erros lançados nos services são tratados.
// =============================================================================

import cors from "cors";                                              // libera chamadas de outros domínios
import express, { NextFunction, Request, Response } from "express";   // framework web
import Mongo from "./db/mongo";                                       // PASSO 1: conexão (usada no shutdown)
import { petRouter } from "./router/pet-router";                      // PASSO 5: as rotas de pet

const server = async () => {
    // Porta do servidor: usa a variável de ambiente NODE_WS_PORT ou 3000 por padrão.
    const port = process.env.NODE_WS_PORT || 3000;
    const app = express();   // cria a aplicação Express

    // --- MIDDLEWARES (executados em ordem, em toda requisição) ---
    app.use(cors());           // permite que um front-end em outro endereço chame a API
    app.use(express.json());   // converte o corpo JSON da requisição em objeto (req.body)

    // --- ROTAS ---
    // Tudo que começar com "/pets" é encaminhado para o petRouter (Passo 5).
    app.use("/pets", petRouter);

    // --- ERROR HANDLER (middleware especial, com 4 parâmetros começando por "err") ---
    // É AQUI que os "throw { status, message }" dos services (Passo 3) caem.
    // Por isso não precisamos de try/catch espalhado pelo código.
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;                       // usa o status do erro ou 500
        const message = err.message || "Server Internal Error."; // mensagem do erro ou padrão
        res.status(status).json({ message });
    });

    // Liga o servidor e fica "escutando" requisições na porta definida.
    app.listen(port, () => {
        console.log(`O servidor web foi iniciado na porta ${port}.`);
    });

    // --- ENCERRAMENTO LIMPO ---
    // Quando o SO pede para encerrar o processo (ex.: Ctrl+C), fecha a conexão com o banco.
    const shutdown = async () => {
        const conn = await Mongo.getInstance();
        await conn.close();
        console.log("Conexão encerrada com sucesso!");
        process.exit(0);
    }

    process.on("SIGTERM", shutdown);  // sinal de término (ex.: kill)
    process.on("SIGINT", shutdown);   // sinal de interrupção (Ctrl+C)
}

export { server };
