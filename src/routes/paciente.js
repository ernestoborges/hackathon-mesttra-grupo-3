const { error } = require("console");
const { Paciente } = require("../db/models/Paciente");
const { Router } = require("express");
const router = Router();

router.get("/:id", async (req, res) => {
    try {
        const pacientes = await Paciente.findOne({
            where: { id_paciente: req.params.id }
        });

        res.status(200).json(pacientes)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar paciente: ${error}` })
    }
});

router.get("/", async (req, res) => {
    try{
        const listarPacientes = await Paciente.findAll();
        res.status(200).json(listarPacientes)
    }catch (error) {
        res.status(500).json({ message: `Erro ao buscar paciente: ${error}` })
    }
});

module.exports = router;