import express from "express";
import cors from 'cors';
import {Routes} from './interfaces/router.interfaces';
import {AppDataSource} from "./config/data-source";
import {NODE_ENV, PORT, ORIGIN, CREDENTIALS} from './config/index';
import myMorgan from "./middlewares/multer.middleware";

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;

        this.env !== 'test' && this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.info(`=================================`);
            console.info(`======= ENV: ${this.env} =======`);
            console.info(`🚀 App listening on the port ${this.port}`);
            console.info(`=================================`);
        });
    }

    public getServer() {
        return this.app;
    }

    private connectToDatabase() {
        AppDataSource.initialize()
            .then(() => {
                console.log("DataSource Connect Success!");
            })
            .catch((err) => {
                console.error("DataSource Connect Error!!");
                console.log(err)
            })
    }

    private initializeMiddlewares() {
        this.app.use(myMorgan);
        this.app.use(cors({origin: ORIGIN, credentials: CREDENTIALS}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/apis', route.router);
        });
        this.app.use('/', ((req, res, next) => {
            res.send("Hello World!");
        }))
    }
}

export default App;