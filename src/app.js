import './config/dotenv.js';
import express from 'express';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import productRouter from './routes/productRouter.routes.js';
import cartRouter from './routes/cartRouter.routes.js';
import viewsRouter from './routes/viewsRouter.routes.js';
import sessionRouter from './routes/sessions.routes.js';
import usersServiceRouter from './routes/users.service.routes.js';
import usersRouter from './routes/users.routes.js';
import __dirname from './utils/utils.js';
import websocket from './websocket.js';
import { logger } from "../src/middlewares/logger.js"
import { conectarDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initPassport } from './config/config.passport.js'; 

const app = express();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const PORT = process.env.PORT || 3000;
const dbName = process.env.DB_NAME;
const cookiesSecret = process.env.COOKIES_SECRET;

const url = `mongodb+srv://${user}:${password}@cluster0.dinb9xq.mongodb.net/?appName=Cluster0`;
conectarDB(url, dbName);

//Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(logger);
app.use(cookieParser(cookiesSecret));

initPassport();
app.use(passport.initialize());

//Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/users', usersServiceRouter);
app.use('/users', usersRouter)
app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Server corriendo en http://localhost:${PORT}`);
});

const io = new Server(httpServer);

websocket(io);