const express = require('express');
const db = require('../db'); // 导入你的 MySQL 数据库连接池
const router = express.Router();
const bcrypt = require('bcrypt');

// 获取一个水质数据
router.get('/waterdata', (req, res) => {
    const sql = "SELECT * FROM waterqualitydata WHERE 'pH(无量纲)' IS NOT NULL AND '溶氧量(mg/L)' IS NOT NULL AND '高锰酸盐指数（mg/L）' IS NOT NULL AND '氨氮（mg/L）' IS NOT NULL AND '总磷（mg/L）' IS NOT NULL ORDER BY RAND() LIMIT 1";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results); // 将数据作为 JSON 响应返回给前端
        }
    });
});

module.exports = router;