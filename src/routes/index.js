const { Router } = require("express");
const router = Router();

const pacienteRouters = require("./paciente");
const vacinaRouters = require("./vacina");

router.use("/paciente", pacienteRouters)
router.use("/vacina", vacinaRouters)

module.exports = router