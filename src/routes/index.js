const { Router } = require("express");
const router = Router();

const pacienteRouters = require("./paciente");
const vacinaRouters = require("./vacina");
const vacinaAplicadaRouters = require("./vacinaAplicada");

router.use("/paciente", pacienteRouters)
router.use("/vacina", vacinaRouters)
router.use("/vacinaaplicada", vacinaAplicadaRouters);

module.exports = router