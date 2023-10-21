import express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import api from './routes/api';
import web from './routes/web';
import db from './config/db';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', api);
// app.use('/api/users', userRoutes);
app.use('/', web);
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/src/views'));

(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        await db.sync(); // This synchronizes your models with the database
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
