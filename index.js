const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const urlencoded = bodyParser.urlencoded({extended: false});

app = express();
app.use(express.static(path.join(__dirname, 'public')));

// conexão mysql
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'brayen',
    password: 'hAck12@2021',
    port: 3306
});
sql.query('use crud');

// Rotas do programa
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/add', urlencoded, (req, res) => {
    let data = req.body;

    if (data['name'].length != 0 && data['email'].length != 0 && data['password'].length != 0) {
        if (sql.query('INSERT INTO students VALUES (NULL, ?, ?, ?)', [data['name'], data['email'], data['password']])) {
            res.send('Student was saved successfuly!');
        } else {
            res.send('Error was occurred!');
        }
    } else {
        res.send('Complete all fields!!');
    }
});

app.get('/read', (req, res) => {
    sql.query('SELECT * FROM students', (err, result, fields) => {
        if (!err) {
            res.send(result);
        }
    });
});

app.post('/delete', urlencoded, async(req, res) => {
    let id = req.body['id'];

    if (sql.query('DELETE FROM students WHERE id=?', [id])) {
        res.send('Student was deleted successfuly!!');
    } else {
        res.send('Error was occurred!!');
    }
});

app.post('/edit', urlencoded, async(req, res) => {
    let data = req.body;
    // console.log(id);
    sql.query('SELECT * FROM students WHERE id=?', [data['id']], (err, result, fields) => {
        res.json(result);
    });

});

app.listen(4000, () => {
    console.log("Servidor rodando na url http://localhost:4000");
});
