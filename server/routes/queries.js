const express = require('express');
const router = express.Router();

const {
    CostaRica, Nicaragua,
    ElSalvador, Mexico
} = require('../controllers/queries');

router.route("/CostaRica").post(CostaRica);
router.route("/ElSalvador").post(ElSalvador);
router.route("/Nicaragua").post(Nicaragua);
router.route("/Mexico").post(Mexico);

module.exports = router;