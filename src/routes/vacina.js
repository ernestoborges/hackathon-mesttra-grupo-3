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
        res.status(500).json({ message: `Erro ao buscar paciente: ${error}` })
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