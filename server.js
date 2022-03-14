const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')


const usersRoute = require("./routes/users");

require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.use(
  '/api/users/',
  usersRoute
)



function main() {
  mongoose.connect(process.env.DB_URL,  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (e) => {
    console.log("db connected");
    console.log(e);
  });
}


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)

  main()
})
