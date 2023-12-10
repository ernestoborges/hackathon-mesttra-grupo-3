const { Paciente } = require("../db/models/Paciente");
const { Router } = require("express");
const { VacinaAplicada } = require("../db/models/VacinaAplicada");
const { Vacina } = require("../db/models/Vacina");
const { PeriodoAplicacaoMes } = require("../db/models/PeriodoAplicacaoMes");
const { Op } = require('sequelize');
const { PeriodoAplicacaoAno } = require("../db/models/PeriodoAplicacaoAno");
const router = Router();
const { getDiffMonth, getDiffYear } = require("../utils/date-calc")

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
        res.status(500).json({ message: `Erro ao buscar todos os pacientes: ${error}` })
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


// vacinas apicadas
router.get("/:id/vacina", async (req, res) => {

    const idPaciente = req.params.id;

    if (!idPaciente) return res.status(400).json({ message: "Parâmetro faltando." });

    try {

        const paciente = await Paciente.findByPk(idPaciente)
        if (!paciente) return res.status(400).json({ message: "Paciente não encontrado." })

        const vacinasAplicadas = await VacinaAplicada.findAll({
            where: { id_paciente: idPaciente },
            include: [Vacina],
        })

        res.status(200).json(vacinasAplicadas)

    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar vacinas de paciente', error });
    }

})

router.post("/:id/vacina", async (req, res) => {

    const idPaciente = req.params.id;
    const { dataAplicacao, idVacina } = req.body;

    if (!idPaciente || !idVacina || !dataAplicacao) return res.status(400).json({ message: "Parâmetro faltando." });

    try {

        const paciente = await Paciente.findByPk(idPaciente)
        if (!paciente) return res.status(400).json({ message: "Paciente não encontrado." })

        const vacina = await Vacina.findByPk(idVacina);
        if (!vacina) return res.status(400).json({ message: "Vacina não encontrada." })

        const vacinaAplicada = await VacinaAplicada.create({
            id_paciente: paciente.id_paciente,
            id_vacina: vacina.id_vacina,
            data_aplicacao: dataAplicacao
        })

        res.status(200).json(vacinaAplicada)

    } catch (error) {
        return res.status(500).json({ message: 'Erro ao adicionar vacinas de paciente', error });
    }

})

router.delete("/:idPaciente/vacina/:idVacina", async (req, res) => {

    const { idPaciente, idVacina } = req.params;

    if (!idPaciente || !idVacina) return res.status(400).json({ message: "Parâmetro faltando." });

    try {

        const vacinasDeletadas = await VacinaAplicada.destroy({
            where: {
                id_paciente: idPaciente,
                id_vacina: idVacina,
            },
        });

        if (!vacinasDeletadas) return res.status(404).json({ error: 'Nenhuma vacina aplicada encontrada para exclusão' });

        return res.status(200).json({ message: 'Vacina aplicada excluída com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar vacinas de paciente', error });
    }
})

// vacina pendente
router.get("/:id/vacina-pendente", async (req, res) => {

    const idPaciente = req.params.id;

    if (!idPaciente) return res.status(400).json({ message: "Parâmetro faltando." });

    try {

        const paciente = await Paciente.findByPk(idPaciente)
        if (!paciente) return res.status(400).json({ message: "Paciente não encontrado." })

        const diffMeses = getDiffMonth(paciente.data_nascimento)
        const diffAnos = getDiffYear(paciente.data_nascimento)

        const vacinasAplicadas = await VacinaAplicada.findAll({
            where: {
                id_paciente: paciente.id_paciente,
            },
            attributes: ['id_vacina'],
        });
        const idsVacinasAplicadas = vacinasAplicadas.map((vacina) => vacina.id_vacina);

        const vacinasNaoAplicadasNoPeriodoMes = await Vacina.findAll({
            where: {
                id_vacina: {
                    [Op.notIn]: idsVacinasAplicadas,
                },
            },
            include: [
                {
                    model: PeriodoAplicacaoMes,
                    where: {
                        qtd_meses_final: {
                            [Op.lte]: diffMeses,
                        },
                    }
                },
            ],
        });

        const vacinasNaoAplicadasNoPeriodoAno = await Vacina.findAll({
            where: {
                id_vacina: {
                    [Op.notIn]: idsVacinasAplicadas,
                },
            },
            include: [
                {
                    model: PeriodoAplicacaoAno,
                    where: {
                        qtd_ano_final: {
                            [Op.lte]: diffAnos,
                        },
                    }
                },
            ],
        });

        res.status(200).json({ nao_aplicadas: vacinasNaoAplicadasNoPeriodoMes.concat(vacinasNaoAplicadasNoPeriodoAno) })
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar vacinas pendentes de paciente', error });
    }

})


module.exports = router;