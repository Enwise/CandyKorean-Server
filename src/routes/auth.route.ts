import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import AuthController from "../controllers/auth.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateUserDto} from "../dtos/users.dto";
import authMiddleware from "../middlewares/auth.middleware";

class AuthRoute implements Routes {
    public path = '/';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
        this.router.post(`${this.path}login`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn);
        this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
    }
}

export default AuthRoute;