const { error } = require("console");
const { Router } = require("express");
const router = Router();
const {VacinaAplicada} = require("../db/models/VacinaAplicada");

router.get("/", async (req, res) => {
    try{
        const listarVacinasAplic = await VacinaAplicada.findAll();
        res.status(200).json(listarVacinasAplic)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar a vacina aplicada ${error}`})
    }
});

module.exports = router;