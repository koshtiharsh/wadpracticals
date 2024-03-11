const express = require('express')
const mongoose = require('mongoose');
const router = require('./controller/cont');



const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/qwert')
app.use(express.json())

app.use('/',router)






app.listen(80)