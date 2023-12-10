const { Router } = require("express");
const router = Router();
const { Vacina } = require("../db/models/Vacina");
const { Op } = require('sequelize');

router.get("/", async (req, res) => {

    const doenca = req.body.doenca.toLowerCase()

    if (!doenca) return res.status(400).json({ message: "Parametro faltando." })

    try {

        const vacinas = await Vacina.findAll({
            where: {

                [Op.and]: [
                    Vacina.sequelize.where(
                        Vacina.sequelize.fn('LOWER', Vacina.sequelize.col('doenca_protecao')),
                        {
                            [Op.like]: `%${doenca}%`,
                        }
                    ),
                ],
            },
        });


        res.status(200).json(vacinas)
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar a vacina por protecao contra: ${error}` })
    }
});

module.exports = router;