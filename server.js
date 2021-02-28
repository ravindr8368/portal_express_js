const express = require('express');
const app = express();
var cors = require('cors')

app.use("*",cors())

const connectDB = require('./config/db');
connectDB();

const PORT  = process.env.port || 5000;

app.use(express.json({
    extened:false
}))

app.use(express.static('public'))


app.get('/', (req, res )=> res.send(`Welcome to Portal `))


app.use('/api/users/', require('./routes/api/users'))
app.use('/api/post/', require('./routes/api/post'))
app.use('/api/auth/', require('./routes/api/auth'))

app.listen(PORT, () => console.log("Server started"))