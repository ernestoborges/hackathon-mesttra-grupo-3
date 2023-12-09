const { Router } = require("express");
const router = Router();

const pacienteRouters = require("./paciente");

router.use("/paciente", pacienteRouters)

module.exports = router