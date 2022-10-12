import {NextFunction, Request, Response} from "express";
import {User} from "../interfaces/users.interface";
import UsersService from "../services/users.service";

class UsersController {
    public userService = new UsersService();

    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllUsersData: User[] = await this.userService.findAllUsers();

            res.status(200).json({data: findAllUsersData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = Number(req.params.id);
            const findOneUserData: User = await this.userService.findUserById(userId);

            res.status(200).json({ data: findOneUserData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;