const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loja_games"
});

db.connect((err) => {
    if (err) {
        console.log("Erro ao conectar ao banco.");
        return;
    }

    console.log("Banco conectado!");
});


app.get("/categorias", (req, res) => {

    db.query("SELECT * FROM categorias", (err, resultado) => {

        if (err) return res.status(500).json(err);

        res.json(resultado);

    });

});

app.get("/categorias/:id", (req, res) => {

    db.query(
        "SELECT * FROM categorias WHERE id=?",
        [req.params.id],
        (err, resultado) => {

            if (err) return res.status(500).json(err);

            res.json(resultado);

        }
    );

});

app.post("/categorias", (req, res) => {

    const { nome } = req.body;

    db.query(
        "INSERT INTO categorias(nome) VALUES(?)",
        [nome],
        (err, resultado) => {

            if (err) return res.status(500).json(err);

            res.json({
                mensagem: "Categoria cadastrada!",
                resultado
            });

        }
    );

});

app.put("/categorias/:id", (req, res) => {

    const { nome } = req.body;

    db.query(
        "UPDATE categorias SET nome=? WHERE id=?",
        [nome, req.params.id],
        (err, resultado) => {

            if (err) return res.status(500).json(err);

            res.json({
                mensagem: "Categoria atualizada!",
                resultado
            });

        }
    );

});

app.delete("/categorias/:id", (req, res) => {

    db.query(
        "DELETE FROM categorias WHERE id=?",
        [req.params.id],
        (err, resultado) => {

            if (err) return res.status(500).json(err);

            res.json({
                mensagem: "Categoria removida!",
                resultado
            });

        }
    );

});

app.get("/produtos", (req, res) => {

    const sql = `
    SELECT
        produtos.id,
        produtos.nome,
        produtos.descricao,
        produtos.preco,
        produtos.imagem,
        categorias.nome AS categoria
    FROM produtos
    INNER JOIN categorias
        ON produtos.categoria_id = categorias.id
    `;

    db.query(sql, (err, resultado) => {

        if (err) return res.status(500).json(err);

        res.json(resultado);

    });

});

app.get("/produtos/:id", (req, res) => {

    db.query(
        "SELECT * FROM produtos WHERE id=?",
        [req.params.id],
        (err, resultado) => {

            if (err) return res.status(500).json(err);

            res.json(resultado);

        }
    );

});

app.post("/produtos", (req, res) => {

    const {
        nome,
        descricao,
        preco,
        imagem,
        categoria_id
    } = req.body;

    db.query(
        `INSERT INTO produtos
        (nome, descricao, preco, imagem, categoria_id)
        VALUES (?, ?, ?, ?, ?)`,
        [
            nome,
            descricao,
            preco,
            imagem,
            categoria_id
        ],
        (err, resultado) => {

            if (err) return res.status(500).json(err);

            res.json({
                mensagem: "Produto cadastrado!",
                resultado
            });

        }
    );

});

app.put("/produtos/:id", (req, res) => {

    const {
        nome,
        descricao,
        preco,
        imagem,
        categoria_id
    } = req.body;

    db.query(
        `UPDATE produtos
        SET
            nome=?,
            descricao=?,
            preco=?,
            imagem=?,
            categoria_id=?
        WHERE id=?`,
        [
            nome,
            descricao,
            preco,
            imagem,
            categoria_id,
            req.params.id
        ],
        (err, resultado) => {

            if (err) return res.status(500).json(err);

            res.json({
                mensagem: "Produto atualizado!",
                resultado
            });

        }
    );

});

app.delete("/produtos/:id", (req, res) => {

    db.query(
        "DELETE FROM produtos WHERE id=?",
        [req.params.id],
        (err, resultado) => {

            if (err) return res.status(500).json(err);

            res.json({
                mensagem: "Produto removido!",
                resultado
            });

        }
    );

});

app.listen(3000, () => {

    console.log("Servidor rodando em http://localhost:3000");

});
