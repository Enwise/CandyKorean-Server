import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany} from "typeorm"
import {Tutor} from "../interfaces/tutors.interface";
import {UserEntity} from "./users.entity";
import {LevelEntity} from "./levels.entity";
import {CourseEntity} from "./courses.entity";

@Entity('tutor')
export class TutorEntity extends BaseEntity implements Tutor {
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
