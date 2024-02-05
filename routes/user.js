
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


router.get('/:id', async function(req,res){
    try {
        const sqlQuery = 'SELECT id, username, password, created_at FROM user WHERE id=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).status(error.message)
    }


    //res.status(200).json({id:req.params.id})
});

router.get('/', async function(req,res){
    try {        

        // รับค่า Page และ Size จาก query parameters หรือ query string
        const page = req.query.page || 1;
        const size = req.query.size || 10; // หากไม่ระบุ Size จะใช้ค่าเริ่มต้นเป็น 10
       
        // คำนวณ offset สำหรับการ query ข้อมูลในหน้าที่กำหนด
        const offset = (page - 1) * size;

        const QueryAll = 'SELECT id, username, created_at FROM test_db.`user` LIMIT ? OFFSET ?;';
        const rows = await pool.query(QueryAll, [size, offset]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).status(error.message)

    }

});
/*
router.post('/register', async function(req,res) {
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
/*
router.post('/login', async function(req,res) {
    try {
        const {username,password} = req.body;

        const sqlGetUser = 'SELECT password FROM user WHERE username=?';
        const rows = await pool.query(sqlGetUser,username);
        if(rows){
            
            const isValid = await bcrypt.compare(password,rows[0].password)
            res.status(200).json({Status: "Logged in", valid_password: isValid});
        }
        res.status(200).status(`User ${username} was not found`);
        
    } catch (error) {
        res.status(400).status(error.message)

    }
})
*/
/*
router.post('/login', async function(req, res) {
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

        // Create JWT token
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

        // สามารถดึงข้อมูลเวลาหมดอายุของโทเค็นได้จากการแปลงและตรวจสอบโทเค็น
        const decodedToken = jwt.verify(token, 'your_secret_key');
        const expirationTime = new Date(decodedToken.exp * 1000); // เวลาหมดอายุในรูปแบบ Timestamp (มีหน่วยเป็นวินาที)
        
        // แปลงเวลาท้องถิ่น
        const clientTime = expirationTime.toLocaleString();
        console.log(clientTime);

        res.status(200).json({ token: token , expire: expirationTime});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
*/

module.exports = router
