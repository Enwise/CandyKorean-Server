import {UserEntity} from "../entities/users.entity";
import {AppDataSource} from "../config/data-source";

class UsersService{
    public getUsers(){
        return AppDataSource.manager.find(UserEntity)
    }
}

export default UsersService;