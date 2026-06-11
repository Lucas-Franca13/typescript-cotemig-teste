import { MongoClient } from "mongodb";

export default class Mongo {
    private static conn?: MongoClient;

    public static async getInstance() {
        if (!this.conn) {
            this.conn = new MongoClient("mongodb://127.0.0.1:27017/");
            await this.conn.connect();
            console.log("Conexão realizada com sucesso!");
        }
        return this.conn;
    }
}