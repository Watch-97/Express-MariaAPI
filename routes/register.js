
const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken'); // Import middleware

//Fixed 
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
  };

  router.post('/user', async function(req,res) {
    try {
        const { username, password, name, company, confirmPassword } = req.body;

        // ตรวจสอบว่ารหัสผ่านตรงกันหรือไม่
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and confirm password do not match" });
        }

        // ทำการเข้ารหัสรหัสผ่าน
        const encryptedPassword = await bcrypt.hash(password, 10);

        // เพิ่มข้อมูลผู้ใช้ลงในฐานข้อมูล
        const sqlQuery = 'INSERT INTO user (username, password, name, company) VALUES (?, ?, ?, ?)';
        const result = await pool.query(sqlQuery, [username, encryptedPassword, name, company]);      

        // สร้าง JWT token
        const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // ส่งข้อมูลการลงทะเบียนพร้อมกับ token กลับไปยังผู้ใช้
        res.status(200).json({ 
            status: "Registered Successful", 
            userId: result.insertId, 
            username, 
            token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


/*
router.post('/user', async function(req,res) {
    try {
        const {username, password} = req.body;
    
        const encryptedPassword = await bcrypt.hash(password,10)

        const sqlQuery = 'INSERT INTO user (username, password) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [username, encryptedPassword]);      
        
        // Create JWT token
        const token = jwt.sign({ username,password }, process.env.SECRET_KEY, { expiresIn: '1h' });

        //res.status(200).json({ token: token });  

        res.status(200).json({Status: "Registered Successful", userId: result.insertId, username, token:token});
    } catch (error) {
        res.status(400).status(error.message)
    }
})
*/

module.exports = router
