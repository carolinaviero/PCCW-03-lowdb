const express = require('express');
const serverPort = 8000;
const app = express();
const low = require("lowdb");
const fs = require("lowdb/adapters/FileSync");
const adapter = new fs("db.json")
const db = low(adapter);
const cookieParser = require("cookie-parser");
const itemsRouter = require('./routes/items-route');
const authRouter = require('./routes/auth-route');

app.use(express.json());
app.use(cookieParser());

// Set some defaults
db.defaults({ items: [], users: [] }).write();

app.use('/items', itemsRouter);

app.use('/auth', authRouter);

app.listen(serverPort, () => console.log(`Express server is running on port ${serverPort}`));