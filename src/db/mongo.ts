// =============================================================================
// PASSO 1 — Conexão com o banco de dados (MongoDB)
// =============================================================================
// Esta é a CAMADA DE BANCO. Todas as operações de banco passam por aqui.
// Usa o padrão "Singleton": uma única conexão é criada e reaproveitada por
// toda a aplicação, em vez de abrir uma conexão nova a cada requisição
// (abrir conexão é "caro"; reusar é mais rápido e evita estourar o limite).
// =============================================================================

// Importa o cliente do driver oficial do MongoDB (instalado com "npm install mongodb").
import { MongoClient } from "mongodb";

export default class Mongo {
    // Guarda a conexão. É "static" para ser compartilhada por toda a aplicação
    // (pertence à classe, não a um objeto). O "?" indica que pode estar vazia no início.
    private static conn?: MongoClient;

    // Método que devolve a conexão. Sempre use ele para acessar o banco.
    public static async getInstance() {
        // Se ainda NÃO existe conexão, cria uma (isso só acontece na 1ª vez).
        if (!this.conn) {
            // Endereço do MongoDB: 127.0.0.1 = máquina local, 27017 = porta padrão.
            this.conn = new MongoClient("mongodb://127.0.0.1:27017/");
            await this.conn.connect();   // de fato conecta ao banco
            console.log("Conexão realizada com sucesso!");
        }
        // Devolve a conexão (a recém-criada ou a que já existia).
        return this.conn;
    }
}
