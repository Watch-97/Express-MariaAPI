const express = require('express')
const session = require('express-session');
const dotenv = require('dotenv')

dotenv.config({path: '.env-local'})

const PORT = process.env.PORT || "3001"

//Token API Authentication
const verifyToken = require('./middleware/verifyToken'); // Import middleware

const app = express()

// เรียกใช้ middleware ของ express-session Logout
app.use(session({
    cookie: { 
        maxAge: 60000, // ระยะเวลาในการเก็บข้อมูล session หนึ่งนาที (60 วินาที)
        httpOnly: true, // ไม่อนุญาตให้ส่งค่า cookie ผ่าน JavaScript
        secure: false // กำหนดเป็น true ถ้าเซิร์ฟเวอร์ใช้งานในโหมด HTTPS
    },
    secret: 'mysecret', // คีย์ลับสำหรับเข้ารหัส session ที่คุณเลือก
    resave: false,
    saveUninitialized: true
}));



//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false  }))


//Routes1 USER
app.get('/', (req, res) => {
    res.status(200).send("This is not why you're here. Head to /user/:id and replace :id with your user id")
    
})

// User Admin
const userRouter = require('./routes/user')
app.use('/admin/user/list', userRouter);

// Admin create User 
const registerRouter = require('./routes/register')
app.use('/admin/create', registerRouter);


// Route2 /login จะใช้งานจากไฟล์ routes/login.js
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

// Route3 /logout จะใช้งานจากไฟล์ routes/logout.js
const logoutRouter = require('./routes/logout');
app.use('/logout', logoutRouter);




//Listening Port
app.listen(PORT, () => {
    console.log("Start Server at port",PORT)
})



/*
//Query Member ทั้งหมดจาก ไฟล์ members.json
app.get('/member', (req, res) => {
    res.json(members)
})

//Query ข้อมูล Member จาก ID
app.get('/member/:id', (req, res) => {
    res.json(members.find(member => member.id === req.params.id))
})

//สร้าง Member ใหม่
app.post('/member', (req, res) => {
    members.push(req.body)
    res.status(201).json(req.body)
})

//แก้ไขข้อมูล Member จาก ID
app.put('/member/:id', (req, res) => {
    const updateIndex = members.findIndex(member => member.id === req.params.id)
    res.json(Object.assign(members[updateIndex], req.body))
})

//ลบข้อมูล Member
app.delete('/member/:id', (req, res) => {
    const deleteIndex = members.findIndex(member => member.id === req.params.id)
    members.splice(deleteIndex, 1)
    res.status(204).send()
})
*/