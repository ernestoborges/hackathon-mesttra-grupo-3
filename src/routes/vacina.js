const { Vacina } = require("../db/models/Vacina");
const { Rede } = require("../db/models/Rede");
const { Router } = require("express");
const { PeriodoAplicacaoAno } = require("../db/models/PeriodoAplicacaoAno");
const { PeriodoAplicacaoMes } = require("../db/models/PeriodoAplicacaoMes");
const router = Router();

router.get("/", async (req, res) => {
    try {
        const listarVacinas = await Vacina.findAll();
        res.status(200).json(listarVacinas)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar todas as vacinas: ${error}` })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const vacina = await Vacina.findOne({
            where: { id_vacina: req.params.id },
            include: [
                {
                    model: Rede,
                    as: "rede"
                },
                {
                    model: PeriodoAplicacaoAno,
                    as: "PAA"
                },
                {
                    model: PeriodoAplicacaoMes,
                    as: "PAM"
                },
            ]
        });

        res.status(200).json(vacina)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar vacina. ${error}` })
    }
});

router.post("/", async (req, res) => {
    const {
        vacina,
        sigla,
        doencaProtecao,
        dose,
        rede
    } = req.body

    if (!vacina || !sigla || !doencaProtecao || !dose || !rede) return res.status(400).json({ message: "Parametro faltando." })

    try {
        const vacinaEncontrada = await Vacina.findOne({ where: { vacina } });
        if (vacinaEncontrada) return res.status(400).json({ message: "Vacina já cadastrada." })

        const siglaEncontrada = await Vacina.findOne({ where: { sigla_vacina: sigla } });
        if (siglaEncontrada) return res.status(400).json({ message: "Sigla já em uso." })

        const redeEncontrada = await Rede.findByPk(rede)
        if (!redeEncontrada) return res.status(400).json({ message: "A Rede enviada não está cadastrada." })

        let maiorId = await Paciente.max("id_paciente")
        const novaVacina = await Vacina.create({
            id_vacina: maiorId + 1,
            vacina,
            sigla_vacina: sigla.toUpperCase(),
            doenca_protecao: doencaProtecao,
            dose,
            id_rede: rede
        })

        return res.status(201).json({ message: "Vacina criada.", vacina: novaVacina });
    } catch (error) {
        res.status(500).json({ message: `Erro ao criar nova vacina: ${error}` })
    }
});

router.put("/", async (req, res) => {
    const {
        idVacina,
        vacina,
        sigla,
        doencaProtecao,
        dose,
        rede
    } = req.body


    if (!idVacina) {
        if (!vacina) {
            return res.status(400).json({ message: "Vacina não informada." })
        }
    } else if (!sigla && !doencaProtecao && !dose && rede) {
        return res.status(400).json({ message: "Nenhum parametro enviado." })
    }

    try {

        let vacinaEncontrada
        if (idVacina) {
            vacinaEncontrada = await Vacina.findOne({ where: { id_vacina: idVacina } });
        } else {
            vacinaEncontrada = await Vacina.findOne({ where: { vacina } });
        }
        if (!vacinaEncontrada) return res.status(400).json({ message: "Vacina não cadastrada." })

        if (sigla) {
            const siglaEncontrada = await Vacina.findOne({ where: { sigla_vacina: sigla } });
            if (siglaEncontrada) return res.status(400).json({ message: "Sigla já em uso." })
        }

        if (rede) {
            const redeEncontrada = await Rede.findByPk(rede)
            if (!redeEncontrada) return res.status(400).json({ message: "A Rede enviada não está cadastrada." })
        }

        await Vacina.update({
            id_vacina: vacinaEncontrada.id_vacina,
            vacina: vacina ? vacina : vacinaEncontrada.vacina,
            sigla_vacina: sigla ? sigla.toUpperCase() : vacinaEncontrada.sigla_vacina,
            doenca_protecao: doencaProtecao ? doencaProtecao : vacinaEncontrada.doenca_protecao,
            dose: dose ? dose : vacinaEncontrada.dose,
            id_rede: rede ? rede : vacinaEncontrada.id_rede
        }, {
            where: { id_paciente: id }
        })

        const vacinaAtualizada = await Vacina.findByPk(id_vacina);

        return res.status(201).json({
            message: "Vacina atualizada",
            anterior: vacinaEncontrada,
            novo: vacinaAtualizada
        });
    } catch (error) {
        res.status(500).json({ message: `Erro ao atualizar vacina: ${error}` })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const vacinaDel = await Vacina.findByPk(req.params.id);
        if (vacinaDel) {
            await Vacina.destroy({ where: { id_vacina: req.params.id } });
            res.json({ message: "Vacina deletada com sucesso." });
        }
    } catch (error) {
        res.status(500).json({ message: `Erro ao deletar a vacina ${error}` })
    }
});

module.exports = router;