import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany} from "typeorm"
import {Teacher} from "../interfaces/teachers.interface";
import {UserEntity} from "./users.entity";
import {CourseEntity} from "./courses.entity";

@Entity('tutor')
export class TeacherEntity extends BaseEntity implements Teacher {
    @PrimaryGeneratedColumn()
    tutor_id: number

    @Column({default: true})
    enabled: boolean

    @Column()
    name: string

    @Column()
    img_url: string

    @Column()
    profile_url: string

    @Column()
    introduction: string

    @OneToOne(() => UserEntity)
    @JoinColumn({name:"user_id"})
    user: UserEntity

    @OneToMany(()=>CourseEntity, (courses) => courses.tutor)
    courses: CourseEntity[]
}
