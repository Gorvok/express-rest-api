const express = require('express'),
    app = express();
const contactsRouter = require('./routes/contacts');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/v1/contacts', contactsRouter);

app.get('/',
    (req, res) => res.send('Dockerizing Node Application')
)
app.listen(8080,
    () => console.log('[starting]: Server is running at port: 8080'));