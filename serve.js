import Fastify from "fastify";
import mysql from "mysql2/promise";
import cors from "@fastify/cors";

const sql = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "loja_games"
});

const servidor = Fastify();

await servidor.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
});
servidor.get("/categorias", async () => {

    const [resultado] = await sql.query(
        "SELECT * FROM categorias"
    );

    return resultado;

});
servidor.get("/categorias/:id", async (request, reply) => {

    const id = request.params.id;

    const [resultado] = await sql.query(
        "SELECT * FROM categorias WHERE id=?",
        [id]
    );

    return resultado;

});
servidor.post("/categorias", async (request, reply) => {

    const { nome } = request.body;

    if (!nome) {
        return reply.status(400).send({
            erro: "Nome obrigatório!"
        });
    }

    await sql.query(
        "INSERT INTO categorias(nome) VALUES(?)",
        [nome]
    );

    reply.status(201).send({
        mensagem: "Categoria cadastrada!"
    });

});
servidor.put("/categorias/:id", async (request, reply) => {

    const id = request.params.id;
    const { nome } = request.body;

    await sql.query(
        "UPDATE categorias SET nome=? WHERE id=?",
        [nome, id]
    );

    reply.send({
        mensagem: "Categoria atualizada!"
    });

});
servidor.delete("/categorias/:id", async (request, reply) => {

    const id = request.params.id;

    await sql.query(
        "DELETE FROM categorias WHERE id=?",
        [id]
    );

    reply.send({
        mensagem: "Categoria removida!"
    });

});
servidor.listen({
    port: 3000
}, () => {
    console.log("Servidor rodando!");
});