import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Level} from "../interfaces/levels.interfaces";
import {TutorEntity} from "./tutors.entity";
import {CourseEntity} from "./course.entity";

@Entity('level')
export class LevelEntity extends BaseEntity implements Level {
    @PrimaryGeneratedColumn()
    level_id: number

    @Column()
    name: string

    @Column()
    enabled: boolean

    @Column()
    info: string

    @ManyToOne(() => TutorEntity, (tutor) => tutor.levels)
    tutor: TutorEntity

    @OneToMany(() => CourseEntity, (course) => course.level)
    courses: CourseEntity[]
}