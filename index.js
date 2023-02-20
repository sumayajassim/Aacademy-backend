const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./config/database')


app.use(cors())
app.use(express.json())
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/todo'));

app.listen(4000, () => {
    console.log('App listening on port 4000!')
    
})
