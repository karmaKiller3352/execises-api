const User = require('../schemas/User');
mongooseErrorHandler = require('mongoose-error-handler');

const getUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.status(201).json(users)
  } catch (error) {
    res.status(400).json({
      message: mongooseErrorHandler.set(error)
    })
  }
}

module.exports = getUsers