//Fixed 
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
  };

const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
/*
// POST /logout
router.post('/', (req, res) => {
    // Clear token from client-side storage
    // ในกรณีที่ใช้งานบนเว็บเบราว์เซอร์
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();*/

router.post('/', function(req, res) {
    // เช็คว่ามี session หรือไม่
    console.log(req.session.user)
    //console.log(req.session)
    if (req.session && req.session.user) {
        // ถ้ามี session และผู้ใช้ล็อกอินอยู่
        // ทำการล้าง session และทำการออกจากระบบ
        req.session.destroy(function(err) {
            if(err) {
                res.status(500).send('Error logging out');
            } else {
                res.status(200).send('Logged out successfully');
            }
        });
    } else {
        // ถ้าไม่มี session หรือผู้ใช้ไม่ได้ล็อกอิน
        res.status(400).send('No user logged in');
    }
});

module.exports = router;

