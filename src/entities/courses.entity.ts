import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "../interfaces/courses.interface";
import {Level} from "../interfaces/levels.interfaces";
import {LevelEntity} from "./levels.entity";

@Entity('course')
export class CoursesEntity extends BaseEntity implements Course{
    @PrimaryGeneratedColumn()
    course_id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    info: string

    @Column()
    category: string

    @Column()
    view_count: number

    @Column()
    date_created: Date

    @Column()
    date_updated: Date

    @ManyToOne(()=>LevelEntity, (level)=>level.courses)
    level: Level
}