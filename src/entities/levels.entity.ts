import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Level} from "../interfaces/levels.interfaces";
import {CourseEntity} from "./courses.entity";

@Entity('level')
export class LevelEntity extends BaseEntity implements Level {
    @PrimaryGeneratedColumn()
    level_id: number

    @Column()
    name: string

    @Column({default: true})
    enabled: boolean

    @Column()
    info: string

    @OneToMany(() => CourseEntity, (course) => course.level)
    courses: CourseEntity[]
}