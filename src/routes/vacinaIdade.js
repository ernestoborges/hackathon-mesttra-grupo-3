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

router.post("/ano", async (req, res) => {

    const { idVacina, qtdAnoInicial, qtdAnoFinal, descricao } = req.body;

    if (!idVacina || !qtdAnoInicial || !qtdAnoFinal || !descricao) return res.status(400).json({ message: "Parametro faltando." })

    try {
        const periodoAnoEncontrado = await PeriodoAplicacaoAno.findAll({ where: { id_vacina: idVacina } })
        if (periodoAnoEncontrado) return res.status(400).json({ message: "periodo de aplicação ja cadastrada para essa vacina" })

        const periodoMesEncontrado = await PeriodoAplicacaoMes.findAll({ where: { id_vacina: idVacina } })
        if (periodoMesEncontrado) return res.status(400).json({ message: "periodo de aplicação ja cadastrada para essa vacina" })


        let maiorId = await PeriodoAplicacaoAno.max("id")
        const novoPeriodo = await PeriodoAplicacaoAno.create({
            id: maiorId + 1,
            id_vacina: idVacina,
            qtd_ano_inicial: qtdAnoInicial,
            qtd_ano_final: qtdAnoFinal,
            desc_ano: descricao
        })

        return res.status(201).json({ message: "Periodo de vacinação (ano) criado.", periodo: novoPeriodo });
    } catch (error) {
        res.status(500).json({ message: `Erro ao criar periodo de vacinação (ano): ${error}` })
    }
});

router.delete("/ano/:id", async (req, res) => {

    const id = req.params.id;

    if (!id) return res.send(400).json({ message: "Parametro faltando." })

    try {
        const periodosDeletados = await PeriodoAplicacaoAno.destroy({
            where: { id },
        });

        if (!periodosDeletados) return res.status(404).json({ error: 'Nenhuma periodo de vacina encontrada para exclusão' });

        return res.status(200).json({ message: 'Periodo de vacina (ano) excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: `Erro ao excluir periodo de vacinação (ano): ${error}` })
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

router.post("/mes", async (req, res) => {

    const { idVacina, qtdMesInicial, qtdMesFinal, descricao } = req.body;

    if (!idVacina || !qtdMesInicial || !qtdMesFinal || !descricao) return res.send(400).json({ message: "Parametro faltando." })

    try {
        const periodoAnoEncontrado = await PeriodoAplicacaoAno({ where: { idVacina } })
        if (periodoAnoEncontrado) return res.status(400).json({ message: "periodo de aplicação ja cadastrada para essa vacina" })

        const periodoMesEncontrado = await PeriodoAplicacaoMes({ where: { idVacina } })
        if (periodoMesEncontrado) return res.status(400).json({ message: "periodo de aplicação ja cadastrada para essa vacina" })


        let maiorId = await PeriodoAplicacaoMes.max("id")
        const novoPeriodo = await PeriodoAplicacaoMes.create({
            id: maiorId + 1,
            id_vacina: idVacina,
            qtd_meses_inicial: qtdMesInicial,
            qtd_meses_final: qtdMesFinal,
            descricao: descricao
        })

        return res.status(201).json({ message: "Periodo de vacinação (mes) criado.", periodo: novoPeriodo });
    } catch (error) {
        res.status(500).json({ message: `Erro ao criar periodo de vacinação (mes): ${error}` })
    }
});


router.delete("/mes/:id", async (req, res) => {

    const id = req.params.id;

    if (!id) return res.send(400).json({ message: "Parametro faltando." })

    try {
        const periodosDeletados = await PeriodoAplicacaoMes.destroy({
            where: { id },
        });

        if (!periodosDeletados) return res.status(404).json({ error: 'Nenhuma periodo de vacina encontrada para exclusão' });

        return res.status(200).json({ message: 'Periodo de vacina (mes) excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: `Erro ao excluir periodo de vacinação (mes): ${error}` })
    }
});


module.exports = router;