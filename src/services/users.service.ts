import {UserEntity} from "../entities/users.entity";
import {AppDataSource} from "../config/data-source";
import {HttpException} from '../exceptions/HttpException';
import {User} from "../interfaces/users.interface";
import {isEmpty} from "../utils/util";
import {CreateUserDto} from "../dtos/users.dto";
import {hash} from "bcrypt";

const saltRound = 10

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

    public async createUser(userData: CreateUserDto): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: User = await UserEntity.findOne({where: {login_id: userData.login_id}});
        if (findUser) throw new HttpException(409, `This email ${userData.login_id} already exists`);

        const hashedPassword = await hash(userData.password, saltRound);
        const createUserData: User = await UserEntity.create({...userData, password: hashedPassword}).save();

        return createUserData;
    }

    public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: User = await UserEntity.findOne({where: {user_id: userId}});
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        if (isEmpty(userData.password)) {
            await UserEntity.update(userId, {...userData});
        } else {
            const hashedPassword = await hash(userData.password, saltRound);
            await UserEntity.update(userId, {...userData, password: hashedPassword});
        }

        const updateUser: User = await UserEntity.findOne({where: {user_id: userId}});
        return updateUser;
    }

    public async deleteUser(userId: number): Promise<User> {
        if (isEmpty(userId)) throw new HttpException(400, "UserId is empty");

        const findUser: User = await UserEntity.findOne({where: {user_id: userId}});
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        await UserEntity.update(userId, {enabled: true});
        return findUser;
    }
}

export default UsersService;