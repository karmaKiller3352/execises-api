const Exercise = require('../schemas/Exercise');
const User = require('../schemas/User');

const addExecise = async (req, res) => {
  try {
    const userId = req.params.userId

    const user = await User.findOne({ _id: userId })
    
    if (!user) {
      res.status(400).json({
        message: 'User not found'
      })

      return 
    }

    const newExecise = new Exercise({
      userId,
      userName: user.username,
      description: req.body.description,
      duration: req.body.duration,
    })

    if (req.body.date) {
      newExecise.date = req.body.date
    }

    const exercise = await newExecise.save()

    res.status(201).json({
      username: exercise.userName,
      _id: exercise.userId,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    })
  } catch (error) {
    res.status(400).json({
      message: mongooseErrorHandler.set(error)
    })
  }
}

module.exports = addExecise