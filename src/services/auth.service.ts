import {compare, hash} from "bcrypt";
import {UserEntity} from "../entities/users.entity";
import {CreateUserDto} from "../dtos/users.dto";
import {User} from "../interfaces/users.interface";
import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";

class AuthService{
    public async signup(userData: CreateUserDto): Promise<User>{
        if(isEmpty(userData)) throw new HttpException(400, "userData is emtpy");

        const findUser: User = await UserEntity.findOne({where:{name:userData.name}});
        if (findUser) throw new HttpException(409, `This email ${userData.name} already exist`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: User = await UserEntity.create({...userData, password: hashedPassword}).save();
        return createUserData;
    }
}

export default AuthService;