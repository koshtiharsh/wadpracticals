const express = require('express');
const bodyParser = require('body-parser'); // Corrected typo here
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { fileURLToPath, pathToFileURL } = require('url');
const { register } = require('./controllers/auth.js');
const { createPost } = require('./controllers/posts.js');
const authRoutes = require('./routes/auth.js');
const users = require('./routes/users.js');
const messages = require('./routes/messages.js');
const posts = require('./routes/posts.js');
const verifyToken = require('./middleware/auth.js');
const User = require('./models/Users.js');
const Post = require('./models/Post.js');
const { users1, posts1 } = require('./data/index.js')

// const {register } =r require('')
// config 

dotenv.config();

const app = express();
app.use(express.json())
// app.use(helmet())
// app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))

app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))


mongoose.connect(process.env.MONGO_URL).then((res) => {
    console.log('mongodb is running')
    //  User.insertMany(users1)
    //  Post.insertMany(posts1)

})


// file storage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })


// routes 
// we have created seperate route here due to need of upload multer else other 
// are in route folder
app.post('/auth/register', upload.single('picture'), register)
app.post('/newpost/xyz', verifyToken, upload.single('picture'), createPost)


// normal routes

app.use('/auth', authRoutes);

app.use('/users', users)

app.use('/posts', posts)

app.use('/messages', messages)


// for messaging 

const http = require('http');
const socketIo = require('socket.io');




const server = http.createServer(app);
const io = socketIo(server);





app.listen(80)