import {NextFunction, Request, Response} from "express";
import {User} from "../interfaces/users.interface";
import UsersService from "../services/users.service";


class UsersController {
    public userService = new UsersService();

    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllUsersData: User[] = await this.userService.getUsers();

            res.status(200).json({ data: findAllUsersData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;