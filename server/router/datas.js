const express = require('express');
const db = require('../db'); // 导入你的 MySQL 数据库连接池
const router = express.Router();
const multer = require('multer'); // 处理文件上传的中间件
const xlsx = require('xlsx'); // 解析 Excel 文件的库
const csvParser = require('csv-parser');
const { Readable } = require('stream');
const path = require('path');
const fs = require('fs');
const fastcsv = require('fast-csv');
const nodemailer = require('nodemailer');

// 设置文件上传存储
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const parseXLSX = (buffer) => {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    const headers = json[0];
    const records = json.slice(1).map(row => {
        const record = {};
        headers.forEach((header, index) => {
            let value = row[index];
            // 检查是否是日期序列号
            if (index == 0) {
                value = excelDateToJSDate(value);
            }
            record[header] = value;
        });
        return record;
    });

    return { headers, records };
};

const excelDateToJSDate = (serial) => {
    // Check for empty input and return null
    if (isNaN(serial) || serial === "") {
      return null;
    }
  
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
  
    // Extract year, month, and day
    const year = date_info.getFullYear();
    const month = date_info.getMonth(); // Month is 0-indexed
    const day = date_info.getDate();
  
    // Return a new Date object with only year, month, and day
    return new Date(year, month, day);
  };

const parseCSV = (buffer) => {
    const readable = new Readable();
    readable._read = () => { }; // 需要实现_read方法,但我们不需要从流中读取数据,因为整个文件都存储在buffer中
    readable.push(buffer); // 将buffer推入可读流
    readable.push(null); // 推入null表示数据已经结束

    return new Promise((resolve, reject) => {
        const records = [];
        let headers;
        readable
            .pipe(csvParser({ skipLines: 0 })) // 跳过第一行(标题行)
            .on('headers', (cols) => {
                headers = cols; // 获取列名
            })
            .on('data', (data) => records.push(data))
            .on('error', (err) => reject(err))
            .on('end', () => resolve({ headers, records }));
    });
};

const processRecords = (records, headers) => {
    return records.map(record => {
        headers.forEach(header => {
            if (record[header] === '--' || record[header] === '') {
                record[header] = null;
            }
        });
        return record;
    });
};

function getTableName(exportDataType) {
    switch (exportDataType) {
        case 'type1':
            return 'users';
        case 'type2':
            return 'fish';
        case 'type3':
            return 'waterqualitydata';
        case 'type4':
            return 'fishnumber';
        case 'type5':
            return 'weather';
        default:
            throw new Error('无效的数据类型');
    }
}

router.post('/upload', upload.single('file'), async (req, res) => {
    const fileType = req.body.type;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();

    let headers; let records;
    if (fileExtension === 'csv') {
        const result = await parseCSV(req.file.buffer);
        headers = result.headers;
        records = result.records;
    } else if (fileExtension === 'xlsx') {
        const result = parseXLSX(req.file.buffer);
        headers = result.headers;
        records = result.records;
    } else {
        return res.status(400).send('Unsupported file type');
    }

    records = processRecords(records, headers);

    const tableName = getTableName(fileType);

    // 插入数据
    const insertQuery = `INSERT INTO ${tableName} (${headers.map((header) => `\`${header}\``).join(',')}) VALUES ?`;
    const values = records.map(record => headers.map(column => record[column]));

    db.query(insertQuery, [values], (err, result) => {
        if (err) throw err;
        res.send('File uploaded and data inserted successfully');
    });
});

function exportData(tableName, exportFileName) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${tableName}`;
        const exportPath = path.join(__dirname, '..', 'export', `${exportFileName}.csv`);
        // console.log("输出文件路径为：" + exportPath)

        db.query(sql, (err, rows) => {
            if (err) return reject(err);

            const ws = fs.createWriteStream(exportPath);
            fastcsv
                .write(rows, { headers: true })
                .on('finish', () => {
                    resolve();
                })
                .on('error', err => {
                    reject(err);
                })
                .pipe(ws);
        });
    });
}

router.post('/download', async (req, res) => {
    const { exportDataType, exportFileName } = req.body;

    if (!exportDataType || !exportFileName) {
        console.log('数据类型或文件名称不能为空');
        return res.status(400).send('数据类型或文件名称不能为空');
    }

    const tableName = getTableName(exportDataType);

    exportData(tableName, exportFileName)
        .then(() => {
            console.log('文件导出成功')
            res.status(200).send('文件导出成功');
        })
        .catch(err => {
            console.log('文件导出失败')
            res.status(500).send('文件导出失败');
            console.error(err);
        });
});

router.get('/waterQualitys', (req, res) => {
    const sql = 'SELECT * FROM waterqualitydata';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

router.post('/email', (req, res) => {
    const { data } = req.body;

    // 创建一个邮件发送器
    let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        auth: {
            user: 'semailbox2024@163.com', // 你的邮件地址
            pass: 'OSXYTEKXQFVVFFHH'   // 你的邮件密码或应用密码
        }
    });

    // 邮件选项
    let mailOptions = {
        from: 'semailbox2024@163.com',
        to: 'mzwangg@gmail.com',
        subject: 'String Array Data',
        text: `Here is the alarm:\n` + data,
    };

    // 发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.info("Failed to send email");
            return res.status(500).send({ error: 'Failed to send email' });
        }
        console.info("Email sent successfully");
        res.status(200).send({ message: 'Email sent successfully' });
    });
});

module.exports = router