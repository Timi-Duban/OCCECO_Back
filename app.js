if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const cron = require('node-cron'); // To do a task every day
const notificationSender = require('./server/controllers/utils/notificationSender')
const cors = require('cors'); // To auth
const bodyParser = require('body-parser'); // Convert old formats
const mongoose = require('mongoose'); // Access to the database
const morgan = require('morgan'); // To have clearer responses
const app = express();

// Database access
const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  });
const db = mongoose.connection;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
db.once('open', _ => {
    console.log('Database connected')
});
db.on('error', err => {
    console.error('connection error:', err)
});

// Send notifications at 08:00:00 am every day
cron.schedule('0 0 08 * * *', () => {
    console.log(' >>> CRON : envoi des notifications <<<');
    notificationSender.sendDailyNotifications();
  });

app.use(bodyParser.json()); // Convert old formats
app.use(morgan('dev')); // Color the status response, dev use

app.use(cors()); // To control who can connect, all origins here

// routes publiques, utilisées pour se connecter
app.use("/api", require('./server/routes/authRoutes'));

// routes accessibles par n'importe quel utilisateur connecté
app.use("/api", require('./server/middleware/auth'), require('./server/routes/connectedRoutes'));

//routes accessibles par les partenaires et administrateurs
 app.use("/api", require('./server/middleware/partner'), require('./server/routes/partnerRoutes'));

//routes accessibles par les administrateurs uniquement 
app.use("/api", require('./server/middleware/admin'), require('./server/routes/adminRoutes'));

/* Handling errors */
app.use((req,res,next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.json({
        error : {
            message : err.message,
            status : err.status
        }
    });
});

module.exports = app;
