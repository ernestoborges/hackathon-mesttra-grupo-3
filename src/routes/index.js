const { Router } = require("express");
const router = Router();

const pacienteRouters = require("./paciente");
const vacinaRouters = require("./vacina");
const vacinaAplicadaRouters = require("./vacinaAplicada");
const vacinaIdadeRouters = require("./vacinaIdade");
const vacinaContraRouters = require("./vacinaContra");
const vacinaCampanhaRouters = require("./campanha");

router.use("/paciente", pacienteRouters)
router.use("/vacina", vacinaRouters)
router.use("/vacina-idade", vacinaIdadeRouters)
router.use("/vacina-contra", vacinaContraRouters)
router.use("/vacinaaplicada", vacinaAplicadaRouters);
router.use("/campanha", vacinaCampanhaRouters)

module.exports = router