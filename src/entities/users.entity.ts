import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm"
import {User} from "../interfaces/users.interface";
import {hashSync, compareSync} from "bcrypt"

const saltRound = 10

@Entity('user')
export class UserEntity extends BaseEntity implements User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    name: string

    @Column()
    login_id: string

    @Column()
    password: string

    @Column()
    enabled: boolean

    @Column()
    nickname: string

    @Column()
    @CreateDateColumn()
    date_created: Date

    @Column()
    @UpdateDateColumn()
    date_updated: Date
}
