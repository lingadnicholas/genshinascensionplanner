const express = require('express')
const router = express.Router()
const {
    getPrimos, 
    setPrimo,
    updatePrimo,
    deletePrimo
} = require('../controllers/primoTrackerController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPrimos).post(protect, setPrimo)
router.route('/:id').delete(protect, deletePrimo).put(protect, updatePrimo)

module.exports = router