import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import AuthController from "../controllers/auth.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import {CreateUserDto} from "../dtos/users.dto";

class AuthRoute implements Routes {
    public path = '/';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    }
}

export default AuthRoute;