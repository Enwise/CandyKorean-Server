import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import UsersController from "../controllers/users.controller";
import {CreateUserDto} from "../dtos/users.dto";
import validationMiddleware from "../middlewares/validation.middleware";

class UsersRoute implements Routes {
    public path = '/user';
    public router = Router();
    public usersController = new UsersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.usersController.getUsers);
        this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
        this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
        this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    }
}

export default UsersRoute;