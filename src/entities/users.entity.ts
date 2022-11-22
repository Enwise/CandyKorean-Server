import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany
} from "typeorm"
import {User} from "../interfaces/users.interface";
import {hashSync, compareSync} from "bcrypt"
import {TutorEntity} from "./tutors.entity";
import {PurchasedCourse} from "../interfaces/purchased_courses.interface";
import {PurchasedCoursesEntity} from "./purchased_courses.entity";

const saltRound = 10

@Entity('user')
export class UserEntity extends BaseEntity implements User {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    name: string

    @Column({unique: true})
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

    @OneToOne(() => TutorEntity)
    tutors: TutorEntity[]

    @OneToMany(() => PurchasedCoursesEntity, (purchasedCourse) => purchasedCourse.user)
    purchasedCourses: PurchasedCoursesEntity[]
}
