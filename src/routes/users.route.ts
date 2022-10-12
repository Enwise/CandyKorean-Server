import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import UsersController from "../controllers/users.controller";

class UsersRoute implements Routes {
    public path = '/user';
    public router = Router();
    public usersControllers = new UsersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.usersControllers.getUsers);
        this.router.get(`${this.path}/:id(\\d+)`, this.usersControllers.getUserById);
    }
}

export default UsersRoute;