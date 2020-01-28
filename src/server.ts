import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import indexRoutes from './routes/indexRoutes';
import postsRoutes from './routes/postsRoutes';
import mongoose from 'mongoose';
import compression from 'compression';

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {

        // Conexion a la base de datos
        const MONGO_URI = 'mongodb://localhost:27017/restapi';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(db => console.log('DB is connected'));

        // Settings
        this.app.set('port', process.env.PORT || 3000);

        // create application/json parser
        this.app.use(bodyParser.json());

        // create application/x-www-form-urlencoded parser
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Reduce el peso de las respuestas
        this.app.use(compression());

        // Soporte de envio de formulario
        // this.app.use(express.urlencoded({ extended: false }));

        // Cors
        this.app.use(cors({ origin: true, credentials: true }));

        // Morgan
        this.app.use(morgan('dev'));

        // Helmet

        this.app.use(helmet());

    }

    routes(): void {
        this.app.use('/',indexRoutes);
        this.app.use('/api/posts',postsRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Port ' + this.app.get('port') + ' enabled.');
        });
    }

}

const server = new Server();

server.start();