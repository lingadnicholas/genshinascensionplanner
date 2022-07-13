const asyncHandler = require('express-async-handler')

const PrimoTracker = require('../models/primoTrackerModel')

// @desc    Get primos
// @route   GET /api/primoTracker
// @access  Private
const getPrimos = asyncHandler(async (req, res) => {
  const primos = await PrimoTracker.find({ user: req.user.id })

  res.status(200).json(primos)
})

// @desc    Set primo
// @route   POST /api/primoTracker
// @access  Private
const setPrimo = asyncHandler(async (req, res) => {
  if (!req.body.pulls || !req.body.type) {
    res.status(400)
    throw new Error('Missing pulls or type field')
  }


  const primo = await PrimoTracker.create({
    user: req.user.id,
    pulls: req.body.pulls,
    type: req.body.type.toString()
  })

  res.status(200).json(primo)
})

// @desc    Update primo
// @route   PUT /api/primoTracker/:id
// @access  Private
const updatePrimo = asyncHandler(async (req, res) => {
  const primo = await PrimoTracker.findById(req.params.id)

  if (!primo) {
    res.status(400)
    throw new Error('Primos not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the primo user
  if (primo.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedPrimo = await PrimoTracker.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPrimo)
})

// @desc    Delete primo
// @route   DELETE /api/primoTracker/:id
// @access  Private
const deletePrimo = asyncHandler(async (req, res) => {
  const primo = await PrimoTracker.findById(req.params.id)

  if (!primo) {
    res.status(400)
    throw new Error('Primos not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the primo user
  if (primo.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await primo.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getPrimos,
  setPrimo,
  updatePrimo,
  deletePrimo,
}
