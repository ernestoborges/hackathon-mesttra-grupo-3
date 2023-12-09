const { error } = require("console");
const { Vacina } = require("../db/models/Vacina");
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
    try {
        const listarVacinas = await Vacina.findAll();
        res.status(200).json(listarVacinas)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar paciente: ${error}` })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const vaicina = await Vacina.findOne({
            where: {id_vacina: req.params.id }
        });
        res.status(200).json(vaicina)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar vacina ${error}`})
    }
});


module.exports = router;