const { sequelize } = require("./db/connect")
const express = require("express");
const app = express()

app.use(express.json())

const olaGrupo = require("./routes/olaGrupo.js");

// Juntar ao app as rotas dos arquivos
app.use("/", olaGrupo)


async function test() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
test()


const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})