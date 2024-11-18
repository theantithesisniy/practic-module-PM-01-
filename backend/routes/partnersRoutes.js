const express = require('express');
const router = express.Router();
const controller = require('../controllers/partnersController')

router.get('/get-partners', controller.getPartnersData);
router.put('/update-partner/:id', controller.putPartnerData)
router.get('/sales-history/:partnerName', controller.getPartnerSalesHistory);

router.post('/calculate-material', controller.calculateMaterial);

router.get('/product-types', controller.getProductTypes);
router.get('/material-types', controller.getMaterialTypes);

module.exports = router;