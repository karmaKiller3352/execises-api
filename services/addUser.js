const User = require('../schemas/User');
const mongooseErrorHandler = require('mongoose-error-handler');


const addUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username
    })

    const user = await newUser.save()

    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({
      message: mongooseErrorHandler.set(error)
    })
  }
}

module.exports = addUser