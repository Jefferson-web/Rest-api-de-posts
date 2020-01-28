"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const postsRoutes_1 = __importDefault(require("./routes/postsRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        // Conexion a la base de datos
        const MONGO_URI = 'mongodb://localhost:27017/restapi';
        mongoose_1.default.set('useFindAndModify', true);
        mongoose_1.default.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(db => console.log('DB is connected'));
        // Settings
        this.app.set('port', process.env.PORT || 3000);
        // create application/json parser
        this.app.use(body_parser_1.default.json());
        // create application/x-www-form-urlencoded parser
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        // Reduce el peso de las respuestas
        this.app.use(compression_1.default());
        // Soporte de envio de formulario
        // this.app.use(express.urlencoded({ extended: false }));
        // Cors
        this.app.use(cors_1.default({ origin: true, credentials: true }));
        // Morgan
        this.app.use(morgan_1.default('dev'));
        // Helmet
        this.app.use(helmet_1.default());
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/posts', postsRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Port ' + this.app.get('port') + ' enabled.');
        });
    }
}
const server = new Server();
server.start();
