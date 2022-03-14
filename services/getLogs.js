const mongooseErrorHandler = require('mongoose-error-handler');
const Exercise = require('../schemas/Exercise');
const User = require('../schemas/User');


const prepareLogs = (exercises) => exercises.map(log => ({
  description: log.description,
  duration: log.duration,
  date: log.date,
}))

const getDateFilter = (from, to) => {
  if (from && to) {
    return {
      date : {
        $gte: new Date(from),
        $lte: new Date(to)
      }
    }
  } else if (from) {
    return {
      date: {
        $gte: new Date(from),
      }
    }
  } else if (to) {
    return {
      date: {
        $lte: new Date(to),
      }
    }
  } else {
    return {}
  }
}

const getLogs = async (req, res) => {
  const limit = req.query.limit || 10
  const to = req.query.to
  const from = req.query.from

  try {
    const userId = req.params.userId

    const user = await User.findOne({ _id: userId })
    
    if (!user) {
      res.status(400).json({
        message: 'User not found'
      })

      return 
    }

    const exercises = await Exercise.find({
      userId,
      ...getDateFilter(from, to)
    })
    .limit(limit)

    res.status(200).json({
      username: user.username,
      count: exercises.length,
      _id: userId,
      log: prepareLogs(exercises)
    })
  } catch (error) {
    res.status(400).json({
      message: mongooseErrorHandler.set(error)
    })
  }
}

module.exports = getLogs