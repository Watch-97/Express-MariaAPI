//Fixed 
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
  };

const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');

//Log in 
const jwt = require('jsonwebtoken');

router.post('/', async function(req, res) {
    try {
        const { username, password } = req.body;

        const sqlGetUser = 'SELECT id, username, password FROM user WHERE username=?';
        const rows = await pool.query(sqlGetUser, username);

        if (rows.length === 0) {
            return res.status(404).json({ message: `User ${username} was not found` });
        }

        const user = rows[0];

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }  
        
        // บันทึกข้อมูล session เมื่อผู้ใช้เข้าสู่ระบบสำเร็จ
        req.session.user = {
            id: user.id,
            username: user.username
        };
        

        res.status(200).json("logged in")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router