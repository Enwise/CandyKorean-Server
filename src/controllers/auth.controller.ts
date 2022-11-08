import {NextFunction, Request, Response} from "express";
import AuthService from "../services/auth.service";
import {CreateUserDto} from "../dtos/users.dto";
import {RequestWithUser} from "../interfaces/auth.interface";
import {User} from "../interfaces/users.interface";

class AuthController {
    public authService = new AuthService();

    public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: CreateUserDto = req.body;
            const signUpUserData = await this.authService.signup(userData);

            res.status(201).json({ data: signUpUserData, message: 'signup' });
        } catch (error) {
            next(error)
        }
    }

    public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: CreateUserDto = req.body;
            const { tokenData, findUser } = await this.authService.login(userData);

            res.status(200).json({ data: findUser, token:tokenData, message: 'login' });
        } catch (error) {
            next(error);
        }
    };


    public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: User = req.user;
            const logOutUserData: User = await this.authService.logout(userData);

            res.status(200).json({ data: logOutUserData, message: 'logout' });
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;