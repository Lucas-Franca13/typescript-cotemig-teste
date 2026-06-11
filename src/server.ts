import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import Mongo from "./db/mongo";
import { petRouter } from "./router/pet-router";

const server = async () => {
    const port = process.env.NODE_WS_PORT || 3000;
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/pets", petRouter);

    // Error Handler
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message || "Server Internal Error.";
        res.status(status).json({ message });
    });

    app.listen(port, () => {
        console.log(`O servidor web foi iniciado na porta ${port}.`);
    });

    // Ao receber o sinal do SO para encerrar o processo, fecha a conexão com o BD.
    const shutdown = async () => {
        const conn = await Mongo.getInstance();
        await conn.close();
        console.log("Conexão encerrada com sucesso!");
        process.exit(0);
    }

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
}

export { server };

