const express = require('express')
const app = express()
const members = require('./member.json')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true  }))

app.get('/', (req, res) => {
    res.send('Hello API world')
})

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

app.listen(4200, () => {
    console.log("Start Server at port 4200")
})