const { Vacina } = require("../db/models/Vacina");
const { PeriodoAplicacaoAno } = require("../db/models/PeriodoAplicacaoAno");
const { PeriodoAplicacaoMes } = require("../db/models/PeriodoAplicacaoMes");
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');

router.get("/ano/ate/:ano", async (req, res) => {

    const ano = req.params.ano;
    if (!ano) return res.send(400).json({ message: "Parametro faltando." })

    try {
        const vacinas = await Vacina.findAll({
            include: [
                {
                    model: PeriodoAplicacaoAno,
                    where: {
                        qtd_ano_final: {
                            [Op.lte]: ano,
                        },
                    }
                },
            ],
        });
        res.status(200).json(vacinas)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar vacina por idade (ano): ${error}` })
    }
});

router.get("/ano/com/:ano", async (req, res) => {
    const ano = req.params.ano;
    if (!ano) return res.send(400).json({ message: "Parametro faltando." })

    try {
        const vacinas = await Vacina.findAll({
            include: [
                {
                    model: PeriodoAplicacaoAno,
                    where: {
                        [Op.and]: [
                            { qtd_ano_inicial: { [Op.lte]: ano } },
                            { qtd_ano_final: { [Op.gte]: ano } },
                        ],
                    },
                },
            ],
        });
        res.status(200).json(vacinas)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar vacina por idade (ano): ${error}` })
    }
});

router.get("/mes/ate/:mes", async (req, res) => {

    const mes = req.params.mes;
    if (!mes) return res.send(400).json({ message: "Parametro faltando." })

    try {
        const vacinas = await Vacina.findAll({
            include: [
                {
                    model: PeriodoAplicacaoMes,
                    where: {
                        qtd_meses_final: {
                            [Op.lte]: mes,
                        },
                    }
                },
            ],
        });
        res.status(200).json(vacinas)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar vacina por idade (mes): ${error}` })
    }
});

router.get("/mes/com/:mes", async (req, res) => {
    const mes = req.params.mes;
    if (!mes) return res.send(400).json({ message: "Parametro faltando." })

    try {
        const vacinas = await Vacina.findAll({
            include: [
                {
                    model: PeriodoAplicacaoMes,
                    where: {
                        [Op.and]: [
                            { qtd_meses_inicial: { [Op.lte]: mes } },
                            { qtd_meses_final: { [Op.gte]: mes } },
                        ],
                    },
                },
            ],
        });
        res.status(200).json(vacinas)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar vacina por idade (mes): ${error}` })
    }
});


module.exports = router;