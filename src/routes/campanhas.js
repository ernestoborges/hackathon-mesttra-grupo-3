const { error } = require("console");
const { Campanha } = require("../db/models/Campanha");
const { Router } = require("express");
const router = Router();
// testada ok
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
// testada ok
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Parâmetro faltando.' });
  
    const { descricao, dataInicio, dataFim } = req.body;
    if (!descricao && !dataInicio && !dataFim) return res.status(400).json({ message: 'Dados faltando.' });
  
    try {
      const campanhaEncontrada = await Campanha.findOne({
        where: { id_campanha: id },
      });
  
      if (!campanhaEncontrada) return res.status(404).json({ message: 'Campanha não encontrada.' });
  
      const campanhaAtualizada = await Campanha.update({
        descricao: descricao ? descricao : campanhaEncontrada.descricao,
        dataInicio: dataInicio ? dataInicio : campanhaEncontrada.dataInicio,
        dataFim: dataFim ? dataFim : campanhaEncontrada.dataFim,
      }, {
        where: { id_campanha: id },
      });
      return res.status(201).json({
        message: "Campanha atualizada",
        anterior: campanhaEncontrada,
        novo: campanhaAtualizada,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar campanha', error });
    }
  });

// não ok
  router.get('/:dataInicio', async (req, res) => {
    const { dataInicio } = req.params;
  
    try {
      const campanhas = await Campanha.find({
        where: {
            data_inicio: dataInicio,
        },
      });
  
      if (!campanhas.length) {
        return res.status(404).json({ message: 'Campanha não encontrada.' });
      }
  
      return res.status(200).json({ campanhas });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao pesquisar campanha', error });
    }
  });

// não ok API para cadatrar vacina em uma campanha
  router.post('/:idCampanha/vacina', async (req, res) => {
    const { idCampanha } = req.params;
    const { idVacina } = req.body;
  
    try {
      const campanhaEncontrada = await Campanha.findOne({
        where: { id_campanha: idCampanha },
      });
  
      if (!campanhaEncontrada) {
        throw new Error('Campanha não encontrada.');
      }
  
      await campanhaEncontrada.addVacina(idVacina);
  
      return res.status(201).json({ message: 'Vacina cadastrada na campanha.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao cadastrar vacina na campanha.', error });
    }
  });
// não testada  API para deletar vacina de uma campanha
  router.delete('/delete/:idVacina', async (req, res) => {
    const { idCampanha } = req.params;
    const { idVacina } = req.params;
  
    try {
      const campanhaEncontrada = await Campanha.findOne({
        where: { id_campanha: idCampanha },
      });
  
      if (!campanhaEncontrada) {
        throw new Error('Campanha não encontrada.');
      }
  
      await campanhaEncontrada.removeVacina(idVacina);
  
      return res.status(200).json({ message: 'Vacina deletada da campanha.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar vacina da campanha.', error });
    }
  });



  module.exports = router;