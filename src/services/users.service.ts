import {UserEntity} from "../entities/users.entity";
import {AppDataSource} from "../config/data-source";
import {HttpException} from '../exceptions/HttpException';
import {User} from "../interfaces/users.interface";
import {isEmpty} from "../utils/util";


class UsersService {
    public async findAllUsers(): Promise<User[]> {
        const users: User[] = await AppDataSource.manager.find(UserEntity)
        return users
    }

    public async findUserById(userId: number) {
        if (isEmpty(userId)) throw new HttpException(400, "UserId is empty");

        const findUser: User = await UserEntity.findOne({where: {user_id: userId}});
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        return findUser;
    }
}

export default UsersService;