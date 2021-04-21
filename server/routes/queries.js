const express = require('express');
const router = express.Router();

const {
    CostaR_historic, Nic_historic, ElSalv_historic,
    Mex_historic, CostaR_forecast, Nic_forecast, 
    ElSalv_forecast
} = require('../controllers/queries');

router.route("/CostaRica/Historic").post(CostaR_historic);
router.route("/CostaRica/Forecast").post(CostaR_forecast);
router.route("/ElSalvador/Historic").post(ElSalv_historic);
router.route("/ElSalvador/Forecast").post(ElSalv_forecast);
router.route("/Nicaragua/Historic").post(Nic_historic);
router.route("/Nicaragua/Forecast").post(Nic_forecast);
router.route("/Mexico/Historic").post(Mex_historic);

module.exports = router;