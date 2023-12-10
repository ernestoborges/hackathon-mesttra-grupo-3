const { addListener } = require("nodemon");
const { Campanha } = require("../db/models/Campanha");
const { Router } = require("express");
const router = Router();


router.get("/", async (req, res) => {
  try {
    let campanhaEncontrada = await Campanha.findAll()
    return res.status(200).json(campanhaEncontrada)
  } catch (error) {
    return res.status(500).json({ message: 'Erro buscar campanhas', error });
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: "Parametro faltando." })
  try {
    let campanhaEncontrada = await Campanha.findOne({ where: { id_campanha: id } })
    if (!campanhaEncontrada) return res.status(400).json({ message: "Campanha não encontrada." })

    return res.status(200).json(campanhaEncontrada)
  } catch (error) {
    return res.status(500).json({ message: 'Erro buscar campanha', error });
  }
})

router.post("/", async (req, res) => {
  const { descricao, dataInicio, dataFim } = req.body;
  if (!descricao || !dataInicio || !dataFim) return res.status(400).json({ message: "Dados faltando." })

  try {
    let campanhaEncontrada = await Campanha.findOne({
      where: { descricao }
    })
    if (campanhaEncontrada) return res.status(400).json({ message: "Campanha já cadastrada." })
    let maiorId = await Campanha.max("id_campanha")

    let novaCampanha = await Campanha.create({
      id_campanha: maiorId + 1,
      descricao,
      data_inicio: dataInicio,
      data_fim: dataFim
    })

    return res.status(201).json({ message: "Campanha criada", campanha: novaCampanha });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar nova campanha', error });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'Parâmetro faltando.' });

  const { descricao, dataInicio, dataFim } = req.body;
  if (!descricao || !dataInicio || !dataFim) return res.status(400).json({ message: 'Dados faltando.' });

  try {

    const campanhaEncontrada = await Campanha.findOne({ where: { id_campanha: id } })


    await Campanha.update({
      descricao: descricao ? descricao : campanhaEncontrada.descricao,
      data_inicio: dataInicio ? dataInicio : campanhaEncontrada.data_inicio,
      data_fim: dataFim ? dataFim : campanhaEncontrada.data_fim,
    }, {
      where: { id_campanha: id },
    });

    const campanhaAtualizada = await Campanha.findByPk(id)

    return res.status(201).json({
      message: "Campanha atualizada",
      anterior: campanhaEncontrada,
      novo: campanhaAtualizada,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar campanha', error });
  }
});

module.exports = router;