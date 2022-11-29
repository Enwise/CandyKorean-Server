import {compare, hash} from "bcrypt";
import {UserEntity} from "../entities/users.entity";
import {CreateUserDto} from "../dtos/users.dto";
import {User} from "../interfaces/users.interface";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {DataStoredInToken, TokenData} from "../interfaces/auth.interface";
import {JWT_SECRET_KEY} from "../config";
import {sign} from "jsonwebtoken";

class AuthService {
    public async signup(userData: CreateUserDto): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: User = await UserEntity.findOne({where: {login_id: userData.login_id}});
        if (findUser) throw new HttpException(409, `This email ${userData.login_id} already exist`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: User = await UserEntity.create({...userData, password: hashedPassword}).save();
        return createUserData;
    }

    public async login(userData: CreateUserDto): Promise<{ findUser: User; tokenData: TokenData }> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
        if (isEmpty(userData.login_id)) throw new HttpException(400, "Login_id is empty");

        const findUser: User = await UserEntity.findOne({where: {login_id: userData.login_id}});
        if (!findUser) throw new HttpException(409, `This name ${userData.login_id} was not found`);

        const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "Password not matching");

        const tokenData = this.createToken(findUser);

        return {tokenData, findUser};
    }

    public async logout(userData: CreateUserDto): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: User = await UserEntity.findOne({ where: { name: userData.name, password: userData.password } });
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        return findUser;
    }

    public createToken(user: User): TokenData {
        const dataStoredInToken: DataStoredInToken = {id: user.user_id};
        const secretKey: string = JWT_SECRET_KEY;
        const expiresIn: number = 60 * 60 * 60 * 30;

        return {expiresIn, token: sign(dataStoredInToken, secretKey, {expiresIn})};
    }
}

export default AuthService;