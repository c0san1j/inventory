const express = require('express');
const router = express.Router();
const userController = require('../controllers/inventoryController');

router.route('/').get(userController.getVan).post(userController.addToVan);
router.get('/:serial', userController.getOneVan);
router.route('/del').post(userController.delVan);
// router.post('/deinstall', userController.deinstall);
// router.post('/install', userController.install);
// router.post('/install', userController.install);

module.exports = router;
