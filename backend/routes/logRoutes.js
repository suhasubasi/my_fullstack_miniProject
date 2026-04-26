const express = require('express');
const router = express.Router();
const { getAllLogs, createLog, updateLog, deleteLog } = require('../controllers/logController');

router.get('/', getAllLogs);
router.post('/', createLog);
router.put('/:id', updateLog);
router.delete('/:id', deleteLog);

module.exports = router;
