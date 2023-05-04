
import express from 'express';
import sqlite3 from 'sqlite3';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = 30000;

const db = await new sqlite3.Database('./db/db.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Message(id INTEGER PRIMARY KEY, title TEXT, content TEXT);");
});

app.use(morgan((tokens, req, res) => {
    return [
        tokens.date(),
        tokens['remote-addr'](req, res),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}));
morgan.token('date', function () {
    var p = new Date().toString().replace(/[A-Z]{3}\+/, '+').split(/ /);
    return (p[2] + '/' + p[1] + '/' + p[3] + ':' + p[4] + ' ' + p[5]);
});

app.use(errorHandler());

// JSON Body Parser Configuration
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');
    next();
});

app.get('/api/messages', (req, res) => {
    db.all("SELECT * FROM Message;", (err, rows) => {
        res.status(200).send(rows)
    })
})

app.post('/api/messages', (req, res) => {
    const title = req.body.message.title;
    const content = req.body.message.content;
    db.prepare(`INSERT INTO Message(title, content) VALUES (?, ?)`).run(title, content, (err) => {
        if (err) {
            res.status(500).send({msg: "oopsy!"})
        } else {
            res.status(200).send({msg: "Message added"})
        }
    })
    
})

// Error Handling
app.use((err, req, res, next) => {
    console.log("Encountered an erroneous request!")
    let datetime = new Date();
    let datetimeStr = `${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString()}`;
    res.status(500).send({
        "error-msg": "Oops! Something went wrong. Check to make sure that you are sending a valid request. Your recieved request is provided below. If it is empty, then it was most likely not provided or malformed. If you have verified that your request is valid, please contact the CS571 staff.",
        "error-req": JSON.stringify(req.body),
        "date-time": datetimeStr
    })
});

// Open Server for Business
app.listen(port, () => {
    console.log(`CS571 API :${port}`)
});
