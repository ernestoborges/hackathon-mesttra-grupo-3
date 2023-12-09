const { sequelize } = require("./db/connect")
const express = require("express");
const app = express()
const router = require("./routes/index")

app.use(express.json())

app.use("/", router)

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