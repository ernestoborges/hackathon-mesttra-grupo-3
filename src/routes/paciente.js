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
    try {
        const listarPacientes = await Paciente.findAll();
        res.status(200).json(listarPacientes)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar paciente: ${error}` })
    }
});

router.post("/", async (req, res) => {
    const { nome, dataNascimento } = req.body;
    if (!nome || !dataNascimento) return res.status(400).json({ message: "Dados faltando." })

    try {
        let pacienteEncontrado = await Paciente.findOne({
            where: { nome }
        })
        if (pacienteEncontrado) return res.status(400).json({ message: "Paciente já cadastrado." })
        let maiorId = await Paciente.max("id_paciente")

        let novoPaciente = await Paciente.create({
            id_paciente: maiorId + 1,
            nome,
            data_nascimento: dataNascimento
        })

        return res.status(201).json({ message: "Paciente criado", paciente: novoPaciente });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar novo paciente', error });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Parâmetro faltando." })

    const { nome, dataNascimento } = req.body;
    if (!nome && !dataNascimento) return res.status(400).json({ message: "Dados faltando." })

    try {
        let pacienteEncontrado = await Paciente.findOne({
            where: { id_paciente: id }
        })

        await Paciente.update({
            nome: nome ? nome : pacienteEncontrado.nome,
            data_nascimento: dataNascimento ? dataNascimento : pacienteEncontrado.data_nascimento
        }, {
            where: { id_paciente: id }
        })

        const pacienteAtualizado = await Paciente.findByPk(id);

        return res.status(201).json({
            message: "Paciente atualizado",
            anterior: pacienteEncontrado,
            novo: pacienteAtualizado
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar paciente', error });
    }
});

module.exports = router;