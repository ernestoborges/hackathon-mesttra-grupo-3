const { Router } = require('express');


const router = Router();

router.get('/', (req, res) => {
    setTimeout(() => {
        res.send('ola grupo');
    }, 5000);
})

module.exports = router;