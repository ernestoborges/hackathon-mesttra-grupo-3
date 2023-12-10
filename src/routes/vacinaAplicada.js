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


router.get("/:id", async (req, res) =>{
    try {
        const vacinaAplicId = await VacinaAplicada.findOne({
            where: {VacinaAplicada: req.params.id}
        });
        res.status(200).json(vacinaAplicId)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar vacina. ${error}`})
    }
})


module.exports = router;