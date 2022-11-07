import {DataStoredInToken, RequestWithUser} from "../interfaces/auth.interface";
import {NextFunction, Response} from "express";
import {JWT_SECRET_KEY} from "../config";
import {verify} from "jsonwebtoken";
import {UserEntity} from "../entities/users.entity";
import {HttpException} from "../exceptions/HttpException";


const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

        if (Authorization) {
            const secretKey: string = JWT_SECRET_KEY;
            const {id} = (await verify(Authorization, secretKey)) as DataStoredInToken;
            const findUser = await UserEntity.findOne({where: {user_id: id}, select: ['user_id', 'name', 'password']});

            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        } else {
            next(new HttpException(404, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(401, 'Wrong authentication token'));
    }
};

export default authMiddleware;