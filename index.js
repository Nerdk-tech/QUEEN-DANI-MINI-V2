const express = require('express');
const app = express();
const path = process.cwd();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

// Load your WhatsApp bot module
let code = require('./pair'); 

// Increase default max listeners (your original code)
require('events').EventEmitter.defaultMaxListeners = 500;

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Bot-related routes
app.use('/code', code);

// Serve your HTML files
app.get('/pair', (req, res) => {
    res.sendFile(path + '/pair.html');
});

app.get('/', (req, res) => {
    res.sendFile(path + '/main.html');
});

// Healthcheck endpoint for Render
app.get('/_health', (req, res) => {
    res.send('OK');
});

// Start the server on Render-compatible host/port
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
--------------------------------------------------
🚀 Server is running!
✅ Port: ${PORT}
🌐 Healthcheck: /_health
--------------------------------------------------
Don't forget to give a star!
`);
});

module.exports = app;