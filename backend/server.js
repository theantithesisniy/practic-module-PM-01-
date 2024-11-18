const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const cors = require('cors');
const partnerRouter = require('./routes/partnersRoutes');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/partners", partnerRouter);

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'master_pol'
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
})

app.on('close', async () => {
    try {
        await pool.end();
        console.log('Соединение с базой данных закрыто');
    } catch (err) {
        console.error('Ошибка при закрытии соединения с базой данных:', err);
    }
});

module.exports = pool;
