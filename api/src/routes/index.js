const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const types = require('./types');
const recipes = require('./recipes');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/types', types);
router.use('/recipes', recipes);

module.exports = router;
