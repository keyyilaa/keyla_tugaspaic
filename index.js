const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hari ini aku sangat happy karena purna OSIS')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})