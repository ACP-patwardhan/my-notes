//connect to database
const connectToMongo = require('./database/connect');
connectToMongo();

//basic express server
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})